import { logger } from '../utils/logger'
import { IUser } from '../database/models/user'
import * as userRepository from '../repository/users'
import * as errors from '../utils/errors'
import * as crypto from '../utils/crypto'

interface ILoggedUser {
  id: number
  email: string
  accessToken: string
}

const login = async (input: IUser): Promise<ILoggedUser> => {
  logger.info({ input }, 'login start')
  const user = await userRepository.findByEmail(input.email.toLocaleLowerCase())
  if (!user) {
    throw new errors.UnauthorizedError()
  }

  const verified = input.password === user.password
  if (!verified) {
    throw new errors.UnauthorizedError()
  }

  const accessToken = await crypto.genenerateAccessToken(user.id)
  logger.info('login end')
  return {
    id: user.id,
    email: user.email,
    accessToken,
  }
}

const signUp = (input: IUser): ILoggedUser => {
  logger.warn('TODO', input)
  return {} as ILoggedUser
}

export { login, signUp, ILoggedUser }
