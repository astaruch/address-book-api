import * as jsonschema from 'jsonschema'
import { logger } from '../utils/logger'
import * as errors from '../utils/errors'

const validate = (inputData: object, schema: jsonschema.Schema): void => {
  const validator = new jsonschema.Validator()
  schema.additionalProperties = false
  const validationErrors = validator.validate(inputData, schema).errors
  if (validationErrors.length > 0) {
    logger.info(validationErrors)
    throw new errors.ValidationError('', validationErrors)
  }
}

export { validate }
