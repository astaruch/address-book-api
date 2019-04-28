import { Context } from 'koa'
import * as chai from 'chai'
import { fakeUserMethods } from '../test'
import { IUser } from '../database/models/user'
import * as users from './users'

const assert = chai.assert
const expect = chai.expect

describe('Controllers', () => {
  describe('Users', () => {
    it('#login user', async () => {
      const { email, password } = fakeUserMethods.createUserData() as IUser
      const ctx = {
        request: {
          body: {
            email,
            password,
          },
        },
      } as Context
      const logged = users.login(ctx)
      expect(logged).to.respondTo('then')
      const resolved = await logged
      assert.isObject(resolved)
    })

    it('#signUp user', async () => {
      const { email, password } = fakeUserMethods.createUserData() as IUser
      const ctx = {
        request: {
          body: {
            email,
            password,
          },
        },
      } as Context
      const newUser = users.signUp(ctx)
      expect(newUser).to.respondTo('then')
      const resolved = await newUser
      assert.isObject(resolved)
    })

    it('#getAll users', () => {
      const ctx = {} as Context
      const allUsers = users.getAll(ctx)
      assert.isArray(allUsers)
    })
  })
})
