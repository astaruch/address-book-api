import pino, { Logger } from 'pino'

const logger: Logger = pino({})
const test = (): void => logger.info('main()')

if (require.main === module) {
  test()
}
