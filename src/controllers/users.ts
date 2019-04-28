import { Context } from 'koa'
import { logger } from '../utils/logger'


const login = (ctx: Context): Promise<void> => {
  logger.warn('TODO', ctx)
  return Promise.resolve()
}

const signUp = (ctx: Context): Promise<void> => {
  logger.warn('TODO', ctx)
  return Promise.resolve()
}

const getAll = (ctx: Context): Promise<void> => {
  logger.warn('TODO', ctx)
  return Promise.resolve()
}

export { login, signUp, getAll }
