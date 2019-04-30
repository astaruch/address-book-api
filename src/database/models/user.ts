import { Model } from 'objection'

interface IUser {
  email: string
  password: string
}

class User extends Model {
  public id: number
  public email: string
  public password: string
  public static get tableName(): string {
    return 'users'
  }
}

export { User, IUser }
