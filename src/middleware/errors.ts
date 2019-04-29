import { Context } from 'koa'
import * as config from '../config'
import * as appErrors from '../utils/errors'
import { logger } from '../utils/logger'

const handleErrors = async (ctx: Context, next: Function): Promise<boolean> => {
  try {
    return await next()
  } catch (err) {
    let responseError = err
    if (!(err instanceof appErrors.AppError)) {
      // This should never happen, log appropriately
      logger.error(err)
      responseError = new appErrors.InternalServerError('')
    }
    // Prepare error response
    const isDevelopment = ['local', 'test', 'development'].includes(config.env)
    ctx.status = responseError.status
    ctx.body = {
      type: responseError.type,
      message: responseError.message,
      stack: isDevelopment && responseError.stack,
    }
    return true
  }
}

const handleNotFound = (): void => {
  throw new appErrors.NotFoundError('')
}

export { handleErrors, handleNotFound }

