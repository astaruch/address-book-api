import { Model } from 'objection'


class User extends Model {
  public id: number
  public email: string
  public password: string
  public contacts: string[]
  public static get tableName(): string {
    return 'users'
  }
}

export { User }
