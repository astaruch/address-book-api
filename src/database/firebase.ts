import fs from 'fs'
import admin, { ServiceAccount } from 'firebase-admin'
import config from '../config'
import { logger } from '../utils/logger'

const init = (): void => {
  logger.info('Initializing firebase database')
  logger.info(`Database URL: ${config.firebase.databaseURL}`)
  let serviceAccount
  if (config.firebase.serviceAccountFile) {
    serviceAccount = JSON.parse(config.firebase.serviceAccountFile)
    logger.info('Using service account file from $FIREBASE_SERVICE_ACCOUNT variable')
  } else {
    logger.info(`Firebase service account file path: ${config.firebase.serviceAccountFilePath}`)
    // eslint-disable-next-line no-sync
    serviceAccount = JSON.parse(fs.readFileSync(config.firebase.serviceAccountFilePath).toString())
  }
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount),
    databaseURL: config.firebase.databaseURL,
  })

  admin.database().ref('/')
}

const dbRef = (): admin.database.Reference => admin.database().ref('/contacts')

export { init, dbRef }
