import { logger } from '../utils/logger'
import { IUser } from '../database/models/user'

interface ILoggedUser {
  id: number
  email: string
  accessToken: string
}

const login = (input: IUser): ILoggedUser => {
  logger.warn('TODO', input)
  return {} as ILoggedUser
}

const signUp = (input: IUser): ILoggedUser => {
  logger.warn('TODO', input)
  return {} as ILoggedUser
}

export { login, signUp, ILoggedUser }
