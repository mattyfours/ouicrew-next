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
    const { team } = req
    const {
      raceTitle,
      startTime,
      distance,
      checkpoints,
      notes,
      isPublic
    } = req.body

    const newRace = await db.Race.create({
      TeamId: team.id,
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
    const { user, team, race } = req

    const entries = await db.RaceEntry.findAll({
      where: {
        RaceId: race.id
      },
      attributes: {
        include: [
          [
            db.sequelize.literal(`(
              SELECT name
                FROM "TeamRacingStandards" AS standard
                WHERE
                    standard.id = "RaceEntry".racing_standard_id
            )`),
            'racing_standard_name'
          ]
        ]
      }
    })

    return returnSuccess(res, {
      user: {
        email: user.email,
        username: user.username
      },
      team,
      entries,
      race
    })
  } catch (err) {
    console.error('Error Creating New Race')
    return errorHandler(res, err)
  }
}

/**
 * Create a new race entry
 * @param {*} req : express req
 * @param {*} res : express res
 * @returns response
 */
export const postRaceEntry = async (req, res) => {
  try {
    const { race } = req

    const {
      name,
      racingStandardId
    } = req.body

    const racingStandard = await db.TeamRacingStandard.findOne({
      where: {
        id: racingStandardId
      }
    })

    if (racingStandard === null) {
      return returnErrorStatusCode(
        422,
        res,
        [{
          path: 'racingStandardId',
          message: 'invalid racing standard'
        }]
      )
    }

    const newEntry = await db.RaceEntry.create({
      RaceId: race.id,
      name,
      racing_standard_id: racingStandardId
    })

    return returnSuccess(res, {
      entry: newEntry,
      message: `${name} entry has been added to the race`
    })
  } catch (err) {
    console.error('Error Creating New Race')
    return errorHandler(res, err)
  }
}

/**
 * Delete Race Entry
 * @param {*} req : express req
 * @param {*} res : express res
 * @returns response
 */
export const deleteRaceEntry = async (req, res) => {
  try {
    const {
      raceId,
      entryId
    } = req.params

    const deletedEntry = await db.RaceEntry.destroy({
      where: {
        id: entryId,
        RaceId: raceId
      }
    })

    return returnSuccess(res, {
      deleted_entry: deletedEntry,
      message: `${deletedEntry.name} entry has been removed from the race`
    })
  } catch (err) {
    console.error('Error Creating New Race')
    return errorHandler(res, err)
  }
}
