import { knex } from '../database'
import { logger } from '../utils/logger'

const query = "SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname='public';"

const ignoreTableNames = [
  'migrations',
  'migrations_lock',
]

const resetDb = async (): Promise<void> => {
  logger.info('Reseting test database')
  const tableNames = await knex.raw(query)
  const names = tableNames.rows
    .map((table: { tablename: string }) => table.tablename)
    .filter((tablename: string) => !ignoreTableNames.includes(tablename))
    .map((tablename: string) => `"${tablename}"`)

  logger.info(tableNames)
  logger.info(names)

  if (names && names.length) {
    // RESTART IDENTITY
    // -> Automatically restart sequences owned by columns of the truncated table(s).
    // CASCADE
    // -> Automatically truncate all tables that have foreign-key references to
    //    any of the named tables, or to any tables added to the group due to CASCADE.
    await knex.raw(`
      TRUNCATE ${names.join()}
      RESTART IDENTITY
      CASCADE`)
  }
}

export { resetDb }
