import * as chai from 'chai'
import { fakeUserMethods } from '../test'
import { User } from '../database/models/user'
import * as users from './users'

const expect = chai.expect

describe('Repository', () => {
  describe('Users', () => {
    it('#create user', () => {
      const userData = fakeUserMethods.createUserData() as User
      const newUser = users.create(userData)
      expect(newUser).has.property('id')
    })
  })
})
