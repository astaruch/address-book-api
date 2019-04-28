import path from 'path'
import config from './index'


export default {
  client: 'pg',
  connection: config.db.uri,
  pool: {
    min: 1,
    max: 10,
  },
  migration: {
    tableName: 'migrations',
    directory: path.resolve(__dirname, './../database/migrations'),
  },
  seeds: {
    directory: path.resolve(__dirname, './../database/seeds'),
  },
}

