/* eslint-disable max-classes-per-file */
import * as jsonschema from 'jsonschema'
import * as httpStatusCodes from 'http-status-codes'
import { logger } from './logger'


class AppError extends Error {
  public type: string
  public status: number

  public constructor(message: string, type: string, status: number) {
    super(message)
    Error.captureStackTrace(this, this.constructor)
    this.name = this.constructor.name
    this.type = type
    this.message = message
    this.status = status
    const stack = this.stack ? this.stack.split('\n') : this.stack
    logger.error({
      error: {
        name: this.name,
        message: this.message,
        type,
        stack: stack && stack.length > 2 ? `${stack[0]}  ${stack[1]}` : stack,
      },
    })
  }
}

/**
 * @apiDefine ValidationError
 * @apiError BadRequest The input request data are invalid.
 * @apiErrorExample {json} BadRequest
 *    HTTP/1.1 400 BadRequest
 *    {
 *      "type": "BAD_REQUEST",
 *      "message": "Invalid or missing request data."
 *    }
 */
class ValidationError extends AppError {
  public errors: jsonschema.ValidationError[]
  public constructor(message: string, errors: jsonschema.ValidationError[]) {
    super(
      message || 'Invalid or missing request data.',
      'BAD_REQUEST',
      httpStatusCodes.BAD_REQUEST,
    )
    this.errors = errors
  }
}

/**
 * @apiDefine NotFoundError
 * @apiError NotFound Requested resource not found.
 * @apiErrorExample {json} NotFound
 *    HTTP/1.1 404 NotFound
 *    {
 *      "type": "NOT_FOUND",
 *      "message": "Resource not found."
 *    }
 */
class NotFoundError extends AppError {
  public constructor(message?: string) {
    super(
      message || 'Resource not found.',
      'NOT_FOUND',
      httpStatusCodes.NOT_FOUND,
    )
  }
}

/**
 * @apiDefine UnauthorizedError
 * @apiError Unauthorized Server denied access to requested resource.
 * @apiErrorExample {json} Unauthorized
 *    HTTP/1.1 401 Unauthorized
 *    {
 *      "type": "UNAUTHORIZED",
 *      "message": "Site access denied."
 *    }
 */
class UnauthorizedError extends AppError {
  public constructor(message?: string) {
    super(
      message || 'Site access denied.',
      'UNAUTHORIZED',
      httpStatusCodes.UNAUTHORIZED,
    )
  }
}

/**
 * @apiDefine IdleTimeoutError
 * @apiError IdleTimeout Server denied access to requested resource.
 * @apiErrorExample {json} IdleTimeout
 *    HTTP/1.1 401 IdleTimeout
 *    {
 *      "type": "IDLE_TIMEOUT",
 *      "message": "Site access denied."
 *    }
 */
class IdleTimeoutError extends AppError {
  public constructor(message?: string) {
    super(
      message || 'Site access denied.',
      'IDLE_TIMEOUT',
      httpStatusCodes.UNAUTHORIZED,
    )
  }
}

/**
 * @apiDefine ConflictError
 * @apiError Conflict The request could not be completed due to
 *  a conflict with the current state of the resource.
 * @apiErrorExample {json} Conflict
 *    HTTP/1.1 409 Conflict
 *    {
 *      "type": "CONFLICT",
 *      "message": "The request could not be completed due to a
 *                  conflict with the current state of the resource."
 *    }
 */
class ConflictError extends AppError {
  public constructor(message?: string) {
    super(
      message
       || 'The request could not be completed due to a conflict with the'
       + 'current state of the resource.',
      'CONFLICT',
      httpStatusCodes.CONFLICT,
    )
  }
}

/**
 * @apiDefine InternalServerError
 * @apiError (Error 5xx) InternalServerError Something went wrong.
 * @apiErrorExample {json} InternalServerError
 *    HTTP/1.1 500 InternalServerError
 *    {
 *      "type": "INTERNAL_SERVER",
 *      "message": "Something went wrong. Please try again later or contact support."
 *    }
 */
class InternalServerError extends AppError {
  public constructor(message?: string) {
    super(
      message || 'Something went wrong. Please try again later or contact support.',
      'INTERNAL_SERVER',
      httpStatusCodes.INTERNAL_SERVER_ERROR,
    )
  }
}

export {
  AppError,
  ValidationError,
  NotFoundError,
  UnauthorizedError,
  IdleTimeoutError,
  ConflictError,
  InternalServerError,
}
