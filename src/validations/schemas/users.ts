import { Schema } from 'jsonschema'


const email: Schema = {
  type: 'string',
  format: 'email',
  maxLength: 80,
}

const password: Schema = {
  type: 'string',
  minLength: 8,
  maxLength: 80,
}

const login: Schema = {
  type: 'Object',
  required: [
    'email',
    'password',
  ],
  properties: {
    email,
    password,
  },
}

const signUp: Schema = {
  type: 'Object',
  required: [
    'email',
    'password',
  ],
  properties: {
    email,
    password,
  },
}

const token: Schema = {
  type: 'string',
}

const jwtToken: Schema = {
  type: 'Object',
  required: [
    'token',
  ],
  properties: {
    token,
  },
}

export { login, signUp, jwtToken }
