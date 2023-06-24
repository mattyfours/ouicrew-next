import errorHandler from '../helpers/errorHandler.js'
import validator from 'validator'
import { returnErrorStatusCode } from '../helpers/returnStatus.js'

/**
 * Create a new team
 * @param {*} req : express req
 * @param {*} res : express res
 * @returns express next || error response
 */
export const teamsCreateNewValidation = (req, res, next) => {
  try {
    const {
      name,
      editorAccessCode,
      viewerAccessCode,
      racingStandard
    } = req.body

    const errors = []

    if (typeof name === 'undefined' || name.length === 0) {
      errors.push({
        path: 'name',
        message: 'Missing team name'
      })
    }

    if (
      typeof editorAccessCode === 'undefined' ||
      editorAccessCode.length === 0 ||
      !validator.isAlphanumeric(editorAccessCode)
    ) {
      errors.push({
        path: 'editorAccessCode',
        message: 'Missing team editor access code'
      })
    }

    if (
      typeof viewerAccessCode === 'undefined' ||
      viewerAccessCode.length === 0 ||
      !validator.isAlphanumeric(viewerAccessCode)
    ) {
      errors.push({
        path: 'viewerAccessCode',
        message: 'Missing team viewer access code'
      })
    }

    if (typeof racingStandard !== 'undefined' && !validator.isAlphanumeric(racingStandard)) {
      errors.push({
        path: 'racingStandard',
        message: 'Invalid racing standard'
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

/**
 * Create a new team
 * @param {*} req : express req
 * @param {*} res : express res
 * @returns express next || error response
 */
export const teamsJoinValidation = (req, res, next) => {
  try {
    const {
      teamId,
      accessCode
    } = req.body

    console.log(teamId)

    const errors = []

    if (typeof teamId === 'undefined' || !validator.isUUID(teamId)) {
      errors.push({
        path: 'teamId',
        message: 'Invalid Team Id'
      })
    }

    if (
      typeof accessCode === 'undefined' ||
    accessCode.length === 0 ||
    !validator.isAlphanumeric(accessCode)

    ) {
      errors.push({
        path: 'accessCode',
        message: 'Missing access code'
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
