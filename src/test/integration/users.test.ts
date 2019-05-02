import supertest from 'supertest'
import * as httpStatusCodes from 'http-status-codes'
import { assert } from 'chai'
import { resetDb } from '../reset-db'
import { createUserData } from '../fake/user'
import app from '../../app'
import { ILoggedUser, IFirebaseContact } from '../../@types'
import { verifyAccessToken } from '../../utils/crypto'
import { createContactData } from '../fake/contact'


describe('REST API', () => {
  before(resetDb)

  let userData: Object
  let accessToken: string

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
      accessToken = loggedUser.accessToken

      assert.isNotEmpty(loggedUser.accessToken)
      assert.isTrue(Boolean(verifyAccessToken(loggedUser.accessToken)))
      assert.isNotEmpty(loggedUser.email)
    })
  })

  describe('/contacts', () => {
    it('POST /contacts: create a new contact for logged user', async () => {
      const contactData = createContactData()

      const request = await supertest(app.listen())
      const res = await request.post('/contacts')
        .set('Authorization', accessToken)
        .send(contactData)
        .expect(httpStatusCodes.CREATED)

      const storedContact: IFirebaseContact = res.body

      assert.isNotEmpty(storedContact)
    })
  })
})
