import { Model } from 'objection'
import knexLib from 'knex'
import knexfile from '../config/knexfile'
import { logger } from '../utils/logger'

const knex = knexLib(knexfile)
const start = async (): Promise<knexLib> => {
  logger.info(`Starting database ${knexfile.connection}...`)
  try {
    await knex.raw("SELECT 'testing connection';")

    Model.knex(knex)
  } catch (err) {
    throw err
  }
  logger.info('Database is running.')
  return knex
}

export { knex, start }
