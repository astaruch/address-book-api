import R from 'ramda'
import * as Objection from 'objection'
import { chance } from '../chance'
import { User } from '../../database/models/user'

const createUserData = (): object => ({
  email: chance.email(),
  password: chance.string({ length: 12 }),
})

const createUser = (userData?: object): Objection.QueryBuilder<User, User, User> => {
  const randomData = createUserData()
  const mergedUserData = R.mergeDeepRight(randomData, userData || {})
  return User.query().insertAndFetch(mergedUserData)
}

export { createUserData, createUser }
