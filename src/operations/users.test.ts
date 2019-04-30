import * as chai from 'chai'
import { fakeUserMethods } from '../test'
import { IUser } from '../database/models/user'
import { logger } from '../utils/logger'
import * as users from './users'

const assert = chai.assert
describe('Operations', () => {
  describe('Users', () => {
    let user: IUser

    before(() => {
      user = fakeUserMethods.createUserData() as IUser
    })

    it('#signUp new user', async () => {
      const newUser = await users.signUp(user)
      assert.isNumber(newUser.id)
      assert.isString(newUser.email)
      assert.isNotEmpty(newUser.email)
      assert.isString(newUser.accessToken)
      assert.isNotEmpty(newUser.accessToken)
    })

    it('#login user', async () => {
      const logged = await users.login(user)
      assert.isNumber(logged.id)
      assert.isString(logged.email)
      assert.isNotEmpty(logged.email)
      assert.isString(logged.accessToken)
      assert.isNotEmpty(logged.accessToken)
    })

    it('#getAll users', () => {
      const allUsers = users.getAll()
      assert.isNotEmpty(allUsers)
    })

    it('#verifyTokenPayload', () => {
      logger.info('TODO')
      assert.isTrue(true)
    })
  })
})
