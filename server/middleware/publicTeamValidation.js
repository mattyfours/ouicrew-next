import errorHandler from '../helpers/errorHandler.js'
import validator from 'validator'
import { returnErrorStatusCode } from '../helpers/returnStatus.js'
import db from '../models/database.js'

/**
 * Add current team to req
 * @param {*} req : express req
 * @param {*} res : express res
 * @returns express next || error response
 */
export const validateAndAddTeamToReq = async (req, res, next) => {
  try {
    const { teamId: teamHandle } = req.params

    const errors = []

    if (
      typeof teamHandle !== 'string' ||
      teamHandle.length === 0
    ) {
      errors.push({
        path: 'name',
        message: 'Missing entry name'
      })
    }

    // Early return if errors
    if (errors.length !== 0) {
      return returnErrorStatusCode(422, res, errors)
    }

    const team = await db.Team.findOne({
      where: {
        handle: {
          [db.Sequelize.Op.eq]: teamHandle
        }
      }
    })

    if (team === null) {
      errors.push({
        path: 'teamId',
        message: 'Invalid team'
      })
    }

    req.team = {
      id: team.id,
      name: team.name,
      handle: team.handle
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
 * Add current team to req
 * @param {*} req : express req
 * @param {*} res : express res
 * @returns express next || error response
 */
export const validateRaceIsPublic = async (req, res, next) => {
  try {
    const {
      teamId: teamHandle,
      raceId
    } = req.params

    const errors = []

    if (
      typeof raceId === 'undefined' ||
      raceId.length === 0 ||
      !validator.isUUID(raceId)
    ) {
      errors.push({
        path: 'raceId',
        message: 'Invalid Race Id'
      })
    }

    // Early return if errors
    if (errors.length !== 0) {
      return returnErrorStatusCode(422, res, errors)
    }

    req.race = await db.Race.findOne({
      where: {
        id: raceId,
        is_public: {
          [db.Sequelize.Op.eq]: true
        }
      }
    })

    if (req.race === null) {
      errors.push({
        path: 'raceId',
        message: 'Race is not public'
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
