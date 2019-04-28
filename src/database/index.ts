import { Model } from 'objection'
import knexLib from 'knex'
import knexfile from '../config/knexfile'

const knex = knexLib(knexfile)
const start = async (): Promise<void> => {
  try {
    await knex.raw("SELECT 'testing connection';")

    Model.knex(knex)
  } catch (err) {
    throw err
  }
}

export { knex, start }
