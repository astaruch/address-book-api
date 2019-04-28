module.exports = {
  logger: {
    stdout: true,
    minLevel: 'debug'
  },
  db: {
    uri: process.env.DB_URI ||
      'postgres://postgres:password@localhost:5433/address-book-db-tests'

  }
}
