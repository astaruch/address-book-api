import { chance } from '../chance'

const createContactData = (): object => ({
  email: chance.email(),
  name: chance.name(),
  number: chance.phone(),
})

export { createContactData }
