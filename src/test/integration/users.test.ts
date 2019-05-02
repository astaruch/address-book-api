import supertest from 'supertest'
import * as httpStatusCodes from 'http-status-codes'
import { assert } from 'chai'
import { resetDb } from '../reset-db'
import { createUserData } from '../fake/user'
import app from '../../app'
import { ILoggedUser } from '../../@types'
import { verifyAccessToken } from '../../utils/crypto'


describe('REST API: users', () => {
  before(resetDb)

  let userData: Object

  before('create user', () => {
    userData = createUserData()
  })

  describe('/users', () => {
    it('POST /users: create a new valid user', async () => {
      const request = await supertest(app.listen())
      const res = await request.post('/users')
        .send(userData)
        .expect(httpStatusCodes.CREATED)

      const newUser: ILoggedUser = res.body

      assert.isNotEmpty(newUser.accessToken)
      assert.isTrue(Boolean(verifyAccessToken(newUser.accessToken)))
      assert.isNotEmpty(newUser.email)
    })
  })

  describe('/session/user', () => {
    it('POST /session/user: vaid login', async () => {
      const request = await supertest(app.listen())
      const res = await request.post('/session/user')
        .send(userData)
        .expect(httpStatusCodes.OK)

      const loggedUser: ILoggedUser = res.body

      assert.isNotEmpty(loggedUser.accessToken)
      assert.isTrue(Boolean(verifyAccessToken(loggedUser.accessToken)))
      assert.isNotEmpty(loggedUser.email)
    })
  })
})
