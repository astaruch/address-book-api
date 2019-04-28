import pino from 'pino'

const logger = pino({
  name: 'address-book',
  level: 'debug',
})

export { logger }
