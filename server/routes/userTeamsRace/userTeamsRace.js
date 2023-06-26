import errorHandler from '../../helpers/errorHandler.js'
import { returnErrorStatusCode, returnSuccess } from '../../helpers/returnStatus.js'
import db from '../../models/database.js'

/**
 * Create a new race
 * @param {*} req : express req
 * @param {*} res : express res
 * @returns response
 */
export const postCreateRace = async (req, res) => {
  try {
    const { teamInfo } = req
    const {
      raceTitle,
      startTime,
      distance,
      checkpoints,
      notes,
      isPublic
    } = req.body

    const newRace = await db.Race.create({
      TeamId: teamInfo.teamId,
      title: raceTitle,
      event_time: new Date(startTime),
      notes: notes || null,
      start_time: Date.now(),
      is_public: isPublic,
      distance,
      checkpoints
    })

    return returnSuccess(res, {
      race: newRace,
      message: `Race ${raceTitle} has been created`
    })
  } catch (err) {
    console.error('Error Creating New Race')
    return errorHandler(res, err)
  }
}

/**
 * Get Race Info
 * @param {*} req : express req
 * @param {*} res : express res
 * @returns response
 */
export const getRaceInfo = async (req, res) => {
  try {
    const { raceId } = req.params
    const { user, teamInfo } = req

    const race = await db.Race.findOne({
      where: {
        id: raceId
      }
    })

    if (!race) {
      return returnErrorStatusCode(
        422,
        res,
        [{ path: 'raceId', message: 'Invalid race id' }]
      )
    }

    const entries = await db.RaceEntry.findAll({
      where: {
        RaceId: raceId
      }
    })

    return returnSuccess(res, {
      user: {
        email: user.email,
        username: user.username
      },
      team: teamInfo,
      entries,
      race
    })
  } catch (err) {
    console.error('Error Creating New Race')
    return errorHandler(res, err)
  }
}
