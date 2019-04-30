import { Server } from 'net'
import Koa from 'koa'
import koaBody from 'koa-bodyparser'
import koaCompress from 'koa-compress'
import koaCors from 'kcors'
import Knex from 'knex'
import { logger } from './utils/logger'
import router from './routes/index'
import * as config from './config'
import * as database from './database'


const app = new Koa()

app.use(koaCompress())
app.use(koaCors())
app.use(koaBody())

app.use(router.routes())
app.use(router.allowedMethods())

interface IServices {
  server: Server | null
  db: Knex | null
}

const services: IServices = {
  server: null,
  db: null,
}

const start = async (): Promise<void> => {
  logger.info(`Environment: ${config.env}`)
  logger.info('Starting app...')

  services.db = await database.start()

  logger.info(`Opening listener on port ${config.server.port}`)
  services.server = app.listen(config.server.port)
  logger.info('Listening')
}

const stop = (): void => {
  logger.info('Stopping app...')
  if (services.server) {
    services.server.close()
  }
  if (services.db) {
    services.db.destroy(() => logger.info('Closing db...'))
  }
}

process.once('SIGINT', () => stop())
process.once('SIGTERM', () => stop())

if (require.main === module) {
  start()
}
