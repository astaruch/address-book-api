import { Context } from 'koa'
import pkg from '../../package.json'
import buildInfo from '../../build-info.json'

export const root = (ctx: Context): void => {
  ctx.body = {
    version: pkg.version,
    name: pkg.name,
    commitHash: buildInfo.commitHash,
    date: buildInfo.date,
  }
}

