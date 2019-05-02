import { Context } from 'koa'
import pkg from '../../package.json'
import buildInfo from '../../build-info.json'
import { logger } from '../utils/logger'

export const root = (ctx: Context): void => {
  logger.info('GET /')
  ctx.body = {
    version: pkg.version,
    name: pkg.name,
    commitHash: buildInfo.commitHash,
    date: buildInfo.date,
  }
}

