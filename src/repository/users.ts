import { QueryBuilder } from 'objection'
import { User } from '../database/models/user'

const create = (user: User): QueryBuilder<User, User, User> => User.query().insertAndFetch(user)

export { create }
