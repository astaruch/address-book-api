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
  auth: {
    secret: process.env.AUTH_SECRET
      || '^7lJ9ziVUHSPrZCC7XJAMTdIw63KI3PiSpo^)366^nrkaTe)QGiL&^vgjLMM',
    saltRounds: 10,
    createOptions: {
      // 1 hour
      expiresIn: 60 * 60,
      algorithm: 'HS256',
      issuer: `com.herokuapp.strv-address-book-staruch-andr.${env}`,
    },
    verifyOptions: {
      algorithm: 'HS256',
      issuer: `com.herokuapp.strv-address-book-staruch-andr.${env}`,
    },
  },

})

export default genCfg
