/* eslint-disable import/group-exports */
import * as Knex from 'knex'


exports.up = (knex: Knex): Knex.SchemaBuilder => knex.schema.alterTable('users', table => {
  table.specificType('contacts', 'text[]').nullable()
})


exports.down = (knex: Knex): Knex.SchemaBuilder => knex.schema.alterTable('users', table => {
  table.dropColumn('contacts')
})

