import { Context } from 'koa'
import * as chai from 'chai'
import { fakeUserMethods } from '../test'
import { logger } from '../utils/logger'
import { IUser } from '../@types'
import * as users from './users'

const assert = chai.assert

describe('Controllers', () => {
  describe('Users', () => {
    let email: string
    let password: string

    before(() => {
      const user = fakeUserMethods.createUserData() as IUser
      email = user.email
      password = user.password
    })

    it('#signUp user', async () => {
      const ctx = {
        request: {
          body: {
            email,
            password,
          },
        },
      } as Context
      await users.signUp(ctx)
      logger.info(ctx)
      assert.isNumber(ctx.body.id)
      assert.isNotEmpty(ctx.body.email)
      assert.isNotEmpty(ctx.body.accessToken)
    })

    it('#login user', async () => {
      const ctx = {
        request: {
          body: {
            email,
            password,
          },
        },
      } as Context
      await users.login(ctx)
      assert.isNotEmpty(ctx.body.email)
      assert.isNotEmpty(ctx.body.accessToken)
    })
  })
})
