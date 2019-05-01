import { Context } from 'koa'
import admin from 'firebase-admin'
import * as httpStatusCodes from 'http-status-codes'
import { validate } from '../validations'
import * as schemas from '../validations/schemas/contacts'
import { logger } from '../utils/logger'
import * as operations from '../operations/contacts'
import { IContact } from '../@types'

const create = async (ctx: Context): Promise<void> => {
  const input = {
    email: ctx.request.body.email,
    name: ctx.request.body.name,
    number: ctx.request.body.number,
    owner: ctx.state.user.id,
  } as IContact
  validate(input, schemas.contact)
  ctx.body = await operations.create(input)
  ctx.status = httpStatusCodes.CREATED
}

const getAll = (ctx: Context): void => {
  const ref = admin.database().ref('/contacts')
  ref.once('value', data => logger.info(data))
  ctx.body = {}
}

export { create, getAll }

