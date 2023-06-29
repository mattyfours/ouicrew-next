import errorHandler from '../helpers/errorHandler.js'
import validator from 'validator'
import { returnErrorStatusCode } from '../helpers/returnStatus.js'
import db from '../models/database.js'

/**
 * Create a new race entry
 * @param {*} req : express req
 * @param {*} res : express res
 * @returns express next || error response
 */
export const raceEntryCreateNewValidation = async (req, res, next) => {
  try {
    const {
      name,
      racingStandardId
    } = req.body

    const {
      race
    } = req

    const errors = []

    if (
      typeof name !== 'string' ||
      name.length === 0
    ) {
      errors.push({
        path: 'name',
        message: 'Missing entry name'
      })
    }

    if (
      racingStandardId.length !== 0 && (
        typeof racingStandardId === 'undefined' ||
       !validator.isUUID(racingStandardId)
      )
    ) {
      errors.push({
        path: 'racingStandardId',
        message: 'Invalid racing standard id'
      })
    }

    // Early return if errors
    if (errors.length !== 0) {
      return returnErrorStatusCode(422, res, errors)
    }

    const findEntryWithName = await db.RaceEntry.findOne({
      where: {
        name: {
          [db.Sequelize.Op.iLike]: name
        },
        RaceId: race.id
      }
    })

    if (findEntryWithName !== null) {
      errors.push({
        path: 'entryName',
        message: 'Already an entry with this name'
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
