import { Server } from 'net'
import Knex from 'knex'
import { User } from '../database/models/user'

interface IAccessToken {
  user: User
  loginTimeout: number
}

interface IContact {
  owner: number
  number: string
  email: string
  name: string
}

interface IFirebaseContact {
  [x: string]: IContact
}


interface IJsonWebTokenDecoded {
  header?: object
  payload?: IJwtPayload
  signature?: object
}

interface IJwtPayload {
  userId?: number
  iat?: number
  exp?: number
  iss?: string
}
interface IJwtToken {
  token: string
}

interface ILoggedUser {
  id: number
  email: string
  accessToken: string
}

interface IServices {
  server: Server | null
  appDb: Knex | null
}

interface IUser {
  email: string
  password: string
}

export {
  IAccessToken,
  IContact,
  IFirebaseContact,
  IJsonWebTokenDecoded,
  IJwtPayload,
  IJwtToken,
  ILoggedUser,
  IServices,
  IUser,
}
