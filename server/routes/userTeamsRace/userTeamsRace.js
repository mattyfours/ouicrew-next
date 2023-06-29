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
    console.error('Error Getting Race Info')
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

    const newEntry = await db.RaceEntry.create({
      RaceId: race.id,
      racing_standard_id: (
        typeof racingStandardId === 'undefined' ||
        !racingStandardId
      )
        ? null
        : racingStandardId,
      name
    })

    return returnSuccess(res, {
      entry: newEntry,
      message: `${name} entry has been added to the race`
    })
  } catch (err) {
    console.error('Error Creating New Race Entry')
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
    console.error('Error Deleting Race')
    return errorHandler(res, err)
  }
}

/**
 * Get Race Info
 * @param {*} req : express req
 * @param {*} res : express res
 * @returns response
 */
export const getRaceOfficiate = async (req, res) => {
  try {
    const { user, team, race } = req

    const entries = await db.RaceEntry.findAll({
      where: {
        RaceId: race.id
      }
    })

    const results = await db.EntryResult.findAll({
      where: {
        RaceId: race.id
      }
    })

    const nonStartedEntries = entries.filter(entry => {
      const hasResultInProgress = results.some(result => (
        result.RaceEntryId === entry.id &&
        result.start_time !== null &&
        result.finish_time === null
      ))

      console.log(hasResultInProgress)
      return hasResultInProgress
    })

    const pendingResults = results
      .filter(result => (
        result.start_time !== null &&
        result.finish_time === null
      ))
      .map(result => {
        const matchEntry = entries.find(entry => entry.id === result.RaceEntryId)

        return {
          entry: matchEntry || {},
          result
        }
      })

    return returnSuccess(res, {
      user: {
        email: user.email,
        username: user.username
      },
      team,
      race,
      entries,
      non_started_entries: nonStartedEntries,
      pending_results: pendingResults,
      time_zone_offset_ms: new Date().getTimezoneOffset() * 60 * 1000
    })
  } catch (err) {
    console.error('Error Getting Race Officiate Info')
    return errorHandler(res, err)
  }
}
