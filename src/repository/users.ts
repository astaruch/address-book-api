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

const addContact = async (userId: number, contactId: string): Promise<User> => {
  const knexQuery = User.knexQuery()
  const knexRaw = User.knex()

  const user = await knexQuery
    .where('id', userId)
    .update({
      contacts: knexRaw.raw('array_append(contacts, ?)', [contactId]),
    })

  return user
}

export { create, findById, findByEmail, findAll, addContact }
