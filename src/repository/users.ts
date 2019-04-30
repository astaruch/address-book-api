import { QueryBuilder } from 'objection'
import { User } from '../database/models/user'
import * as errors from '../utils/errors'


const create = (user: User): QueryBuilder<User, User, User> => User.query().insertAndFetch(user)

const findById = async (id: number): Promise<User> => {
  const user = await User.query().where('id', id).first()

  if (!user) {
    throw new errors.NotFoundError()
  }

  return user
}

const findByEmail = async (email: string): Promise<User> => {
  const user = await User.query().where('email', email).first()

  if (!user) {
    throw new errors.NotFoundError()
  }

  return user
}

const findAll = (): Promise<User[]> => User.query()

export { create, findById, findByEmail, findAll }
