import errorHandler from '../../helpers/errorHandler.js'
import { returnErrorStatusCode, returnSuccess } from '../../helpers/returnStatus.js'
import db from '../../models/database.js'

/**
 * Create a new result
 * @param {*} req : express req
 * @param {*} res : express res
 * @returns response
 */
export const postCreateResult = async (req, res) => {
  try {
    const { team, race, entry } = req
    const {
      recordedTimeFromStart,
      checkpoint,
      recordId: entryId
    } = req.body

    const newResult = await db.EntryResult.create({
      start_time: recordedTimeFromStart,
      finish_time: null,
      TeamId: team.id,
      RaceId: race.id,
      RaceEntryId: entry.id
    })

    return returnSuccess(res, {
      result: newResult,
      message: 'Result has been saved'
    })
  } catch (err) {
    console.error('Error saving result')
    return errorHandler(res, err)
  }
}

/**
 * Update Result
 * @param {*} req : express req
 * @param {*} res : express res
 * @returns response
 */
export const postUpdateResult = async (req, res) => {
  try {
    const {
      team,
      race,
      entry,
      result,
      racingStandard
    } = req
    const {
      recordedTimeFromStart,
      checkpoint
    } = req.body

    const updatedResult = checkpoint === 'finish'
      ? await result.update({
        finish_time: recordedTimeFromStart,
        total_time: recordedTimeFromStart - result.start_time
      })
      : null

    return returnSuccess(res, {
      result: updatedResult,
      message: 'Result has been saved'
    })
  } catch (err) {
    console.error('Error saving result')
    return errorHandler(res, err)
  }
}
