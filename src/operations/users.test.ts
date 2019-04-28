import { Context } from 'koa'
import * as chai from 'chai'
import { fakeUserMethods } from '../test'
import { IUser } from '../database/models/user'
import * as users from './users'

const assert = chai.assert
const expect = chai.expect
describe('Operations', () => {
  describe('Users', () => {
    it('#login user', () => {
      const userData = fakeUserMethods.createUserData() as IUser
      const logged = users.login(userData)
      expect(logged).has.property('accessToken')
      assert.notEqual(logged.accessToken, '')
    })

    it('#signUp user', () => {
      const userData = fakeUserMethods.createUserData() as IUser
      const newUser = users.signUp(userData)
      expect(newUser).has.property('accessToken')
      assert.notEqual(newUser.accessToken, '')
    })
  })
})
