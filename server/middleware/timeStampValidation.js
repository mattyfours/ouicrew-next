import validator from 'validator'
import { returnErrorStatusCode } from '../helpers/returnStatus.js'
import errorHandler from '../helpers/errorHandler.js'

/**
 * Validate User Session
 * @param {*} req : express req
 * @param {*} res : express res
 * @returns express next || error response
 */
export const timeStampValidation = async (req, res, next) => {
  try {
    const {
      'x-ouicrew-timestamp': clientTime
    } = req.headers

    const errors = []
    const serverTime = Date.now()

    if (
      typeof clientTime === 'undefined' ||
    !validator.isNumeric(clientTime)
    ) {
      errors.push({
        path: 'x-ouicrew-timestamp',
        message: 'Missing header x-ouicrew-timestamp'
      })
    }

    req.clientServerTimeDiff = serverTime - Number(clientTime)

    return errors.length > 0
      ? returnErrorStatusCode(422, res, errors)
      : next()
  } catch (err) {
    console.error(err)
    return errorHandler(res, err)
  }
}
