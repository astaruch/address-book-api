import { Context } from 'koa'
import admin from 'firebase-admin'
import { validate } from '../validations'
import * as schemas from '../validations/schemas/contacts'
import { logger } from '../utils/logger'

const create = (ctx: Context): void => {
  const input = {
    email: ctx.request.body.email,
    name: ctx.request.body.name,
    number: ctx.request.body.number,
    owner: ctx.state.id,
  }
  validate(input, schemas.contact)
  ctx.body = {}
}

const getAll = (ctx: Context): void => {
  const ref = admin.database().ref('/contacts')
  ref.once('value', data => logger.info(data))
  ctx.body = {}
}

export { create, getAll }

