import { Server } from 'net'
import pino from 'pino'
import Koa from 'koa'
import router from './routes/index'


const app = new Koa()

app.use(router.routes())
app.use(router.allowedMethods())

const logger = pino({
  name: 'address-book',
  level: 'debug',
})

interface IServices {
  server: Server | null
}

const services: IServices = {
  server: null,
}

const start = (): void => {
  logger.info('Starting app...')
  services.server = app.listen(3000)
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
