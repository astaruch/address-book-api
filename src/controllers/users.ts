import { Context } from 'koa'
import * as httpStatusCodes from 'http-status-codes'
import { validate } from '../validations'
import * as schemas from '../validations/schemas/users'
import * as operations from '../operations/users'


const login = async (ctx: Context): Promise<void> => {
  const input = {
    email: ctx.request.body.email,
    password: ctx.request.body.password,
  }
  validate(input, schemas.login)
  ctx.body = await operations.login(input)
}

const signUp = async (ctx: Context): Promise<void> => {
  const input = {
    email: ctx.request.body.email,
    password: ctx.request.body.password,
  }
  validate(input, schemas.signUp)
  ctx.body = await operations.signUp(input)
  ctx.status = httpStatusCodes.CREATED
}

const getAll = async (ctx: Context): Promise<void> => {
  ctx.body = await operations.getAll()
}

export { login, signUp, getAll }

