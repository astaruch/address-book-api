// import supertest from 'supertest'
// import * as httpStatusCodes from 'http-status-codes'
// import { assert } from 'chai'
// import { resetDb } from '../reset-db'
// import { createUserData } from '../fake/user'
// import app from '../../app'
// import { ILoggedUser } from '../../@types'
// import { verifyAccessToken } from '../../utils/crypto'


// describe('REST API: contacts', () => {
//   before(resetDb)

//   let userData: Object

//   before('create contact', () => {
//     userData = createUserData()
//   })

//   describe('/contacts', () => {
//     it('POST /contact: create a new contact for logged user', async () => {
//       const request = await supertest(app.listen())
//       const res = await request.post('/users')
//         .send(userData)
//         .expect(httpStatusCodes.CREATED)

//       const newUser: ILoggedUser = res.body

//       assert.isNotEmpty(newUser.accessToken)
//       assert.isTrue(Boolean(verifyAccessToken(newUser.accessToken)))
//       assert.isNotEmpty(newUser.email)
//     })
//   })

// })
