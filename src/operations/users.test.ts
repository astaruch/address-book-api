import * as chai from 'chai'
import { fakeUserMethods } from '../test'
import { IUser } from '../@types'
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
      assert.isNotEmpty(newUser.email)
      assert.isNotEmpty(newUser.accessToken)
    })

    it('#login user', async () => {
      const logged = await users.login(user)
      assert.isNotEmpty(logged.email)
      assert.isNotEmpty(logged.accessToken)
    })

    it('#getAll users', () => {
      const allUsers = users.getAll()
      assert.isNotEmpty(allUsers)
    })
  })
})
