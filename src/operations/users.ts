import { logger } from '../utils/logger'
import { User } from '../database/models/user'
import * as userRepository from '../repository/users'
import * as errors from '../utils/errors'
import * as crypto from '../utils/crypto'
import { IUser, ILoggedUser, IJwtToken, IAccessToken } from '../@types'


const login = async (input: IUser): Promise<ILoggedUser> => {
  logger.info(`Login for user ${input.email} has started.`)
  const user = await userRepository.findByEmail(input.email.toLocaleLowerCase())
  if (!user) {
    throw new errors.UnauthorizedError()
  }

  const verified = await crypto.comparePassword(input.password, user.password)
  if (!verified) {
    throw new errors.UnauthorizedError()
  }

  const accessToken = await crypto.genenerateAccessToken(user.id)
  logger.info(`Login for user ${input.email} has successfully ended.`)
  return {
    id: user.id,
    email: user.email,
    accessToken,
  }
}

const signUp = async (input: IUser): Promise<ILoggedUser> => {
  logger.info(`Signing up for user ${input.email} has started.`)
  const user = {
    email: input.email,
    password: await crypto.hashPassword(input.password),
  } as User

  try {
    const emailAlreadyExists = await userRepository.findByEmail(user.email)
    if (emailAlreadyExists) {
      throw new errors.ConflictError('Email is already used!')
    }
  } catch (err) {
    // eslint-disable-next-line no-warning-comments
    // TODO: handle this error that it won't be visible in a log
    if (!(err instanceof errors.NotFoundError)) {
      throw err
    }
  }

  const dbUser = await userRepository.create(user)
  const loggedUser = {
    id: dbUser.id,
    email: dbUser.email,
    accessToken: await crypto.genenerateAccessToken(dbUser.id),
  } as ILoggedUser

  logger.info(`Signing up for user ${input.email} has successfully ended.`)
  return loggedUser
}

const verifyTokenPayload = async (input: IJwtToken): Promise<IAccessToken> => {
  logger.info('Verifying token payload has started')
  let jwtPayload: crypto.IJwtPayload
  try {
    jwtPayload = await crypto.verifyAccessToken(input.token)
  } catch (err) {
    throw new errors.UnauthorizedError()
  }

  const now = Date.now()
  if (!jwtPayload || !jwtPayload.exp || now >= jwtPayload.exp * 1000) {
    throw new errors.UnauthorizedError()
  }
  const userId = Number(jwtPayload.userId)
  const user = await userRepository.findById(userId)
  if (!user) {
    throw new errors.UnauthorizedError()
  }

  logger.info('Verifying token payload has successfully ended')
  const verified = {
    user,
    loginTimeout: jwtPayload.exp * 1000,
  } as IAccessToken
  return verified
}

const getAll = (): Promise<User[]> => userRepository.findAll()

export { login, signUp, verifyTokenPayload, getAll }
