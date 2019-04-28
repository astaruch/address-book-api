import * as Knex from 'knex'
// eslint-disable-next-line import/no-extraneous-dependencies
import Bluebird from 'bluebird'
import usersData from './users.json'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
exports.seed = (knex: Knex): Bluebird<any> => knex('users')
  .del()
  .then(() => knex('users').insert(usersData))
