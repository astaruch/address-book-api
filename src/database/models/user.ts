import { Model } from 'objection'

class User extends Model {
  public static get tableName(): string {
    return 'users'
  }
}

export { User }
