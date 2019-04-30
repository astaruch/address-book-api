import { Schema } from 'jsonschema'

const owner: Schema = {
  type: 'number',
}

const email: Schema = {
  type: 'string',
  format: 'email',
  maxLength: 80,
}

const number: Schema = {
  type: 'string',
}

const name: Schema = {
  type: 'string',
}

const contact: Schema = {
  type: 'Object',
  properties: {
    email,
    number,
    name,
    owner,
  },
}

export { contact }
