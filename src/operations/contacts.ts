import { logger } from '../utils/logger'
import * as contactRepository from '../repository/contacts'
import * as userRepository from '../repository/users'
import { IContact, IFirebaseContact } from '../@types'

const create = async (input: IContact): Promise<IFirebaseContact> => {
  logger.info(`Creating new contact: ${input}`)
  const newContact = contactRepository.create(input)
  const userId = input.owner
  const contactId = Object.keys(newContact)[0]
  await userRepository.addContact(userId, contactId)

  return newContact
}

export { create }
