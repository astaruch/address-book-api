import { logger } from '../utils/logger'
import * as contactRepository from '../repository/contacts'
import * as userRepository from '../repository/users'

interface IContact {
  owner: number
  number: string
  email: string
  name: string
}

const create = async (input: IContact): Promise<contactRepository.IFirebaseContact> => {
  logger.info(`Creating new contact: ${input}`)
  const newContact = contactRepository.create(input)
  const userId = input.owner
  const contactId = Object.keys(newContact)[0]
  await userRepository.addContact(userId, contactId)

  return newContact
}

export { IContact, create }
