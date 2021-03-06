/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
import * as R from 'ramda'
import genCfg from './default'

const env: string = process.env.NODE_ENV || 'local'

if (env === 'local') {
  require('dotenv').config({ silent: false })
}

const envConfigPath = `./env/${env}`
const envConfig = require(envConfigPath)

const defaultConfig = genCfg(env)

const resultConfig = R.mergeDeepRight(defaultConfig, envConfig)

export = resultConfig
