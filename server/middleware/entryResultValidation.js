import errorHandler from '../helpers/errorHandler.js'
import validator from 'validator'
import { returnErrorStatusCode } from '../helpers/returnStatus.js'
import db from '../models/database.js'

/**
 * Create a new entry result
 * @param {*} req : express req
 * @param {*} res : express res
 * @returns express next || error response
 */
export const createEntryResultValidation = async (req, res, next) => {
  try {
    const {
      checkpoint,
      recordId: entryId
    } = req.params

    const errors = []

    if (
      typeof checkpoint !== 'string' ||
      checkpoint.length === 0
    ) {
      errors.push({
        path: 'checkpoint',
        message: 'Missing entry name'
      })
    }

    if (
      typeof entryId !== 'string' ||
      entryId.length === 0
    ) {
      errors.push({
        path: 'entryId',
        message: 'Missing entry name'
      })
    }

    return errors.length > 0
      ? returnErrorStatusCode(422, res, errors)
      : next()
  } catch (err) {
    console.error(err)
    return errorHandler(res, err)
  }
}
