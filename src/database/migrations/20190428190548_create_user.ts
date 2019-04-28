/* eslint-disable import/group-exports */
import * as Knex from 'knex'

exports.up = (knex: Knex): Knex.SchemaBuilder => knex.schema.createTable('users', table => {
  table.increments('id').primary()
  table.string('email').unique()
  table.string('password')
})

exports.down = (knex: Knex): Knex.SchemaBuilder => knex.schema.dropTable('users')
