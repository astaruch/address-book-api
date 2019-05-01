import admin from 'firebase-admin'
import { IContact } from '../operations/contacts'
import * as errors from '../utils/errors'

interface IFirebaseContact {
  [x: string]: IContact
}

const create = (contact: IContact): IFirebaseContact => {
  const ref = admin.database().ref('contacts')
  const newContact = ref.push({ ...contact })
  if (!newContact.key) {
    throw new errors.ExternalServiceError()
  }
  return { [newContact.key]: contact }
}

export { create, IFirebaseContact }

