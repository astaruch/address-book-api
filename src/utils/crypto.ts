import crypto from 'crypto'
import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'
import * as config from '../config'
import { IJwtPayload, IJsonWebTokenDecoded } from '../@types'
import { logger } from './logger'

const pepperify = (str: string): string => crypto
  .createHmac('sha1', config.auth.secret)
  .update(str)
  .digest('hex')

// Defined in default config (section: config.auth)


const genenerateAccessToken = (userId: number): string => {
  const payload = { userId } as IJwtPayload
  return jwt.sign(payload, config.auth.secret, config.auth.createOptions)
}

const verifyAccessToken = (authToken: string): IJwtPayload => {
  try {
    const decoded: IJsonWebTokenDecoded | string = jwt
      .verify(authToken, config.auth.secret, config.auth.verifyOptions)

    let payload
    if (typeof decoded === 'string') {
      // check if we have JSON string
      try {
        const obj = JSON.parse(decoded)
        if (obj !== null && typeof obj === 'object') {
          payload = obj
        }
        return {} as IJwtPayload
      } catch (err) {
        return {} as IJwtPayload
      }
    } else {
      payload = decoded
    }
    if (payload.payload) {
      return payload.payload
    }
    return payload as IJwtPayload
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError || err instanceof SyntaxError) {
      logger.error(err)
      return {}
    }
    throw err
  }
}

const hashPassword = (password: string): Promise<string> =>
  bcrypt.hash(pepperify(password), config.auth.saltRounds)

const comparePassword = (plaintext: string, ciphertext: string): Promise<boolean> =>
  bcrypt.compare(pepperify(plaintext), ciphertext)

export { genenerateAccessToken, verifyAccessToken, hashPassword, comparePassword, IJwtPayload }
