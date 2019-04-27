import pino from 'pino'

const logger = pino({
  name: 'address-book',
  level: 'debug',
})

const test = (): void => logger.info('main()')

if (require.main === module) {
  test()
}
