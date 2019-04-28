import { Server } from 'net'
import Koa from 'koa'
import { logger } from './utils/logger'
import router from './routes/index'
import * as config from './config'


const app = new Koa()

app.use(router.routes())
app.use(router.allowedMethods())

interface IServices {
  server: Server | null
}

const services: IServices = {
  server: null,
}

const start = (): void => {
  logger.info('Starting app...')
  services.server = app.listen(config.server.port)
  logger.info(`Listening on port ${config.server.port}`)
}

const stop = (): void => {
  logger.info('Stopping app...')
  if (services.server) {
    services.server.close()
  }
}

process.once('SIGINT', () => stop())
process.once('SIGTERM', () => stop())

if (require.main === module) {
  start()
}
