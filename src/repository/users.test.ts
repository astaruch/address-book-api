import * as chai from 'chai'
import { fakeUserMethods } from '../test'
import { User } from '../database/models/user'
import { logger } from '../utils/logger'
import * as users from './users'

const assert = chai.assert

describe('Repository', () => {
  describe('Users', () => {
    it('#create user', () => {
      const userData = fakeUserMethods.createUserData() as User
      const newUser = users.create(userData)
      assert.isNotEmpty(newUser)
    })

    it('#findById', () => {
      logger.warn('TODO')
    })

    it('#findByEmail', () => {
      logger.warn('TODO')
    })
  })
})
