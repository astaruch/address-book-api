import { MigratorConfig } from 'knex'
import { knex, start } from '../database/index'
import knexfile from '../config/knexfile'


describe('Test setup', () => {
  describe('Database', () => {
    it('successfully migrates database to latest version', async () => {
      const config: MigratorConfig = {
        directory: knexfile.migration.directory,
      }
      await knex.migrate.latest(config)
    })

    it('successfully starts connection to db', async () => {
      await start()
    })
  })
})
