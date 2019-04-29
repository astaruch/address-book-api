import crypto from 'crypto'
import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'
import * as config from '../config'
import { logger } from './logger'

const pepperify = (str: string): string => crypto
  .createHmac('sha1', config.auth.secret)
  .update(str)
  .digest('hex')

const genenerateAccessToken = (userId: number): string => {
  const payload = { userId }
  return jwt.sign(payload, config.auth.secret, config.auth.createOptions)
}

const verifyAccessToken = (authToken: string): string | object => {
  try {
    return jwt.verify(authToken, config.auth.secret, config.auth.verifyOptions)
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

export { genenerateAccessToken, verifyAccessToken, hashPassword, comparePassword }
