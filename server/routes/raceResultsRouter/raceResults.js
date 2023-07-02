import errorHandler from '../../helpers/errorHandler.js'
import { returnSuccess } from '../../helpers/returnStatus.js'
import db from '../../models/database.js'

/**
 * Create a new result
 * @param {*} req : express req
 * @param {*} res : express res
 * @returns response
 */
export const postCreateResult = async (req, res) => {
  try {
    const {
      team,
      race,
      entry
    } = req

    const {
      recordedTimeFromStart,
      checkpoint
    } = req.body

    const setResultCount = await db.EntryResult.count({
      where: {
        RaceEntryId: entry.id
      }
    })

    const newResult = await db.EntryResult.create({
      start_time: recordedTimeFromStart,
      finish_time: checkpoint === 'dns'
        ? recordedTimeFromStart
        : null,
      set: setResultCount + 1,
      TeamId: team.id,
      RaceId: race.id,
      RaceEntryId: entry.id
    })

    return returnSuccess(res, {
      result: newResult,
      message: 'Result has been saved',
      entry
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
      race,
      entry,
      result,
      racingStandard
    } = req

    const {
      recordedTimeFromStart,
      checkpoint
    } = req.body

    // Update appropriate checkpoint
    if (checkpoint === 'start') {
      await result.update({
        start_time: recordedTimeFromStart
      })
    } else if (checkpoint === 'finish') {
      await result.update({
        finish_time: recordedTimeFromStart
      })
    } else if (
      checkpoint === 'dnf' &&
      result.start_time !== null
    ) {
      await result.update({
        finish_time: result.start_time
      })
    } else {
      const updatedCheckpoints = { ...result.checkpoint_times }
      updatedCheckpoints[checkpoint] = recordedTimeFromStart
      await result.update({
        checkpoint_times: updatedCheckpoints
      })
    }

    // Update total time if possible
    if (
      result.finish_time !== null &&
      result.start_time !== null
    ) {
      await result.update({
        total_time: Number(result.finish_time) - Number(result.start_time)
      })
    }

    // Update racing standard percentage if possible
    if (
      racingStandard !== null &&
      result.total_time !== null &&
      result.finish_time !== result.total_time &&
      Number(result.total_time) !== 0
    ) {
      const resultMeterPerSecond = (
        Number(race.distance) /
        (Number(result.total_time) / 1000)
      )

      const standardMeterPerSecond = (
        Number(race.distance) /
        (Number(racingStandard.time_in_ms) / 1000)
      )

      const racingStandardPercentage = parseFloat(
        (resultMeterPerSecond / standardMeterPerSecond) * 100
      ).toFixed(2)

      await result.update({
        racing_standard_percentage: racingStandardPercentage
      })
    }

    return returnSuccess(res, {
      message: 'Result has been saved',
      result,
      entry
    })
  } catch (err) {
    console.error('Error saving result')
    return errorHandler(res, err)
  }
}
