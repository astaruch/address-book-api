import fs from 'fs'
import admin, { ServiceAccount } from 'firebase-admin'
import config from '../config'
import { logger } from '../utils/logger'

const init = (): void => {
  logger.info('Initializing firebase database')
  logger.info(`-  service account path: ${config.firebase.serviceAccountFile}`)
  logger.info(`-  database URL: ${config.firebase.databaseURL}`)
  // eslint-disable-next-line no-sync
  const serviceAccount = JSON.parse(fs.readFileSync(config.firebase.serviceAccountFile).toString())
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount),
    databaseURL: config.firebase.databaseURL,
  })

  admin.database().ref('/')
}

const dbRef = (): admin.database.Reference => admin.database().ref('/contacts')

export { init, dbRef }
