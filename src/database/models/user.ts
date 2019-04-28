import { Model } from 'objection'

interface IUser {
  email: string
  password: string
}

class User extends Model {
  public static get tableName(): string {
    return 'users'
  }
}

export { User, IUser }
