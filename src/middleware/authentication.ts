import { Context } from 'koa'
import { UnauthorizedError } from '../utils/errors'
import { validate } from '../validations'
import * as userSchemas from '../validations/schemas/users'
import * as userOperations from '../operations/users'
import { IJwtToken } from '../@types'
import { logger } from '../utils/logger';


const authenticate = async (ctx: Context, next: Function): Promise<Function> => {
  logger.info('Checking JWT token')
  if (!ctx.header.authorization) {
    throw new UnauthorizedError()
  }

  const token = ctx.header.authorization
  const input = {} as IJwtToken
  if (token.startsWith('Bearer ')) {
    input.token = token.slice(7, token.length).trimLeft()
  } else {
    input.token = token
  }

  validate(input, userSchemas.jwtToken)
  const data = await userOperations.verifyTokenPayload(input)
  if (ctx.response && data.loginTimeout) {
    ctx.set('Login-timeout', data.loginTimeout.toString())
  }
  ctx.state.user = data.user
  return next()
}


export { authenticate }
