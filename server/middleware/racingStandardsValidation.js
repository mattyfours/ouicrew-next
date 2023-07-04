import errorHandler from '../helpers/errorHandler.js'
import { returnErrorStatusCode } from '../helpers/returnStatus.js'
import db from '../models/database.js'

/**
 * Create a new race entry
 * @param {*} req : express req
 * @param {*} res : express res
 * @returns express next || error response
 */
export const racingStandardCreateNewValidation = async (req, res, next) => {
  try {
    const { team } = req

    const {
      name,
      category,
      distance,
      time
    } = req.body

    const errors = []

    if (
      typeof name !== 'string' ||
      name.length === 0
    ) {
      errors.push({
        path: 'name',
        message: 'Missing racing standard name'
      })
    }

    if (
      typeof category !== 'string' ||
      category.length === 0
    ) {
      errors.push({
        path: 'category',
        message: 'Missing racing standard category'
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

    const timeSplit = time.split(/[:.]/)
    req.racingStandardTimeBreakdown = {
      h: Number(timeSplit[0]),
      m: Number(timeSplit[1]),
      s: Number(timeSplit[2]),
      ms: Number(timeSplit[3])
    }

    if (
      isNaN(req.racingStandardTimeBreakdown?.h) ||
      isNaN(req.racingStandardTimeBreakdown?.m) ||
      isNaN(req.racingStandardTimeBreakdown?.s) ||
      isNaN(req.racingStandardTimeBreakdown?.ms) ||
      req.racingStandardTimeBreakdown?.h < 0 ||
      req.racingStandardTimeBreakdown?.h > 24 ||
      req.racingStandardTimeBreakdown?.m < 0 ||
      req.racingStandardTimeBreakdown?.m > 59 ||
      req.racingStandardTimeBreakdown?.s < 0 ||
      req.racingStandardTimeBreakdown?.s > 59 ||
      req.racingStandardTimeBreakdown?.ms < 0 ||
      req.racingStandardTimeBreakdown?.ms > 99
    ) {
      errors.push({
        path: 'time',
        message: 'Invalid time, must follow format HH:MM:SS.MS'
      })
    }

    // Early return if errors
    if (errors.length !== 0) {
      return returnErrorStatusCode(422, res, errors)
    }

    const findRacingStandardWithSameName = await db.TeamRacingStandard.findOne({
      where: {
        name: {
          [db.Sequelize.Op.iLike]: name
        },
        category: {
          [db.Sequelize.Op.eq]: category
        },
        TeamId: team.id
      }
    })

    if (findRacingStandardWithSameName !== null) {
      errors.push({
        path: 'categoryName',
        message: 'This racing standard already exists for this team'
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
