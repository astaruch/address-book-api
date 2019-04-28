import * as pkg from '../../package.json'

const genCfg = (env: string): object => ({
  env,
  appName: pkg.name,
  version: pkg.version,
  server: {
    port: process.env.PORT || 3000,
    bodyParser: {
      patchKoa: true,
      urlencoded: true,
      text: false,
      json: true,
      multipart: false,
    },
    cors: {
      origin: '*',
      exposeHeaders: [
        'Authorization',
        'Content-Language',
        'Content-Length',
        'Content-Type',
        'Date',
        'ETag',
      ],
      maxAge: 3600,
    },
  },
  db: {
    uri: process.env.DB_URI
      || 'postgres://postgres:password@localhost:5432/address-book-db',

  },
})

export default genCfg
