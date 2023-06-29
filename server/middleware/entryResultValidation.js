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
    const { race } = req
    const {
      recordedTimeFromStart,
      checkpoint,
      recordId: entryId
    } = req.body

    const errors = []

    if (
      typeof recordedTimeFromStart !== 'number'
    ) {
      errors.push({
        path: 'checkpoint',
        message: 'Invalid Time'
      })
    }

    if (
      typeof checkpoint !== 'string' ||
      checkpoint.length === 0
    ) {
      errors.push({
        path: 'checkpoint',
        message: 'Missing checkpoint'
      })
    }

    if (
      typeof entryId !== 'string' ||
      entryId.length === 0
    ) {
      errors.push({
        path: 'entryId',
        message: 'Missing entry id'
      })
    }

    if (errors.length !== 0) {
      return returnErrorStatusCode(422, res, errors)
    }

    const entry = await db.RaceEntry.findOne({
      where: {
        id: entryId
      }
    })

    if (!entry) {
      errors.push({
        path: 'entry',
        message: 'Invalid entry id'
      })
    }

    const pendingEntryResult = await db.EntryResult.findOne({
      where: {
        RaceEntryId: entry.id,
        start_time: {
          [db.Sequelize.Op.not]: null
        },
        finish_time: {
          [db.Sequelize.Op.is]: null
        }
      }
    })

    if (pendingEntryResult !== null) {
      errors.push({
        path: 'entry',
        message: 'Entry is currently in progress'
      })
    }

    req.entry = entry

    req.racingStandard = entry.racing_standard_id === null
      ? null
      : await db.TeamRacingStandard.findOne({
        where: {
          id: entry.racing_standard_id
        }
      })

    return errors.length > 0
      ? returnErrorStatusCode(422, res, errors)
      : next()
  } catch (err) {
    console.error(err)
    return errorHandler(res, err)
  }
}

/**
 * Update an entry result
 * @param {*} req : express req
 * @param {*} res : express res
 * @returns express next || error response
 */
export const updateEntryResultValidation = async (req, res, next) => {
  try {
    const { resultId } = req.params
    const { race } = req
    const {
      recordedTimeFromStart,
      checkpoint
    } = req.body

    const errors = []

    if (
      typeof recordedTimeFromStart !== 'number'
    ) {
      errors.push({
        path: 'checkpoint',
        message: 'Invalid Time'
      })
    }

    if (
      typeof checkpoint !== 'string' ||
      checkpoint.length === 0
    ) {
      errors.push({
        path: 'checkpoint',
        message: 'Missing checkpoint'
      })
    }

    if (
      typeof resultId !== 'string' ||
      resultId.length === 0 ||
      !validator.isUUID(resultId)
    ) {
      errors.push({
        path: 'resultId',
        message: 'Missing result id'
      })
    }

    if (errors.length !== 0) {
      return returnErrorStatusCode(422, res, errors)
    }

    req.result = await db.EntryResult.findOne({
      where: {
        id: resultId
      }
    })

    if (!req.result) {
      errors.push({
        path: 'result',
        message: 'Invalid result id'
      })
    }

    req.entry = await db.RaceEntry.findOne({
      where: {
        id: req.result.RaceEntryId
      }
    })

    if (!req.entry) {
      errors.push({
        path: 'entry',
        message: 'Invalid entry id'
      })
    }

    req.racingStandard = req.entry.racing_standard_id === null
      ? null
      : await db.TeamRacingStandard.findOne({
        where: {
          id: req.entry.racing_standard_id
        }
      })

    return errors.length > 0
      ? returnErrorStatusCode(422, res, errors)
      : next()
  } catch (err) {
    console.error(err)
    return errorHandler(res, err)
  }
}
