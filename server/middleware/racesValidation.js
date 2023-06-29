import errorHandler from '../helpers/errorHandler.js'
import validator from 'validator'
import { returnErrorStatusCode } from '../helpers/returnStatus.js'
import db from '../models/database.js'

/**
 * Create a new team
 * @param {*} req : express req
 * @param {*} res : express res
 * @returns express next || error response
 */
export const raceCreateNewValidation = (req, res, next) => {
  try {
    const {
      raceTitle,
      startTime,
      distance,
      checkpoints,
      notes,
      isPublic
    } = req.body

    const errors = []

    if (
      typeof raceTitle !== 'string' ||
      raceTitle.length === 0
    ) {
      errors.push({
        path: 'raceTitle',
        message: 'Missing race title'
      })
    }

    if (
      typeof startTime === 'undefined' ||
      !validator.isDate(new Date(startTime))
    ) {
      errors.push({
        path: 'startTime',
        message: 'Invalid start time'
      })
    }

    if (
      typeof distance !== 'number' ||
      distance < 10 ||
      distance > 1000000
    ) {
      errors.push({
        path: 'distance',
        message: 'Invalid distance, distance must be between 10-1000000'
      })
    }

    if (
      typeof checkpoints !== 'number' ||
      checkpoints < 0 ||
      checkpoints > 100
    ) {
      errors.push({
        path: 'checkpoints',
        message: 'Invalid checkpoints, checkpoints must be between 0-100'
      })
    }

    if (
      typeof notes !== 'undefined' &&
      notes !== '' &&
      !validator.isAlphanumeric(notes)
    ) {
      errors.push({
        path: 'notes',
        message: 'Invalid notes'
      })
    }

    if (
      typeof isPublic === 'undefined' &&
      !validator.isBoolean(isPublic)
    ) {
      errors.push({
        path: 'isPublic',
        message: 'Must set if public or not'
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

export const raceIdValidation = async (req, res, next) => {
  try {
    const { raceId } = req.params
    const race = await db.Race.findOne({
      where: {
        id: raceId
      }
    })

    const errors = []

    if (!race) {
      errors.push({
        path: 'raceId',
        message: 'InvalidRaceId'
      })
    }

    req.race = race

    return errors.length > 0
      ? returnErrorStatusCode(422, res, errors)
      : next()
  } catch (err) {
    console.error(err)
    return errorHandler(res, err)
  }
}
