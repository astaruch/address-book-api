import { Context } from 'koa'
import { logger } from '../utils/logger'
import { validate } from '../validations'
import * as schemas from '../validations/schemas/users'
import * as operations from '../operations/users'


const login = async (ctx: Context): Promise<operations.ILoggedUser> => {
  const input = {
    email: ctx.request.body.email,
    password: ctx.request.body.password,
  }
  validate(input, schemas.login)
  ctx.body = await operations.login(input)
  return ctx.body
}

const signUp = async (ctx: Context): Promise<operations.ILoggedUser> => {
  const input = {
    email: ctx.request.body.email,
    password: ctx.request.body.password,
  }
  validate(input, schemas.signUp)
  ctx.body = await operations.signUp(input)
  return ctx.body
}

const getAll = (ctx: Context): Promise<void> => {
  logger.warn('TODO', ctx)
  return Promise.resolve()
}

export { login, signUp, getAll }
