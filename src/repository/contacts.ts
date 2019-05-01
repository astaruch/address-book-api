import admin from 'firebase-admin'
import * as errors from '../utils/errors'
import { IFirebaseContact, IContact } from '../@types'

const create = (contact: IContact): IFirebaseContact => {
  const ref = admin.database().ref('contacts')
  const newContact = ref.push({ ...contact })
  if (!newContact.key) {
    throw new errors.ExternalServiceError()
  }
  return { [newContact.key]: contact }
}

export { create }

