import errorHandler from '../../helpers/errorHandler.js'
import { returnErrorStatusCode, returnSuccess } from '../../helpers/returnStatus.js'
import db from '../../models/database.js'
import findFullResults from '../../utils/findFullResults.js'

/**
 * Get a list of all teams
 * @param {*} req : express req
 * @param {*} res : express res
 * @returns response
 */
export const getAllTeams = async (req, res) => {
  try {
    const teams = await db.Team.findAll()

    const responseTeams = teams.map(team => {
      delete team.editor_access_code
      delete team.viewer_access_code
      return team
    })

    return returnSuccess(res, {
      teamsList: responseTeams
    })
  } catch (err) {
    console.error('Error Viewing User Teams')
    return errorHandler(res, err)
  }
}

/**
 * Get a team's public info
 * @param {*} req : express req
 * @param {*} res : express res
 * @returns response
 */
export const getTeamPublicInfo = async (req, res) => {
  try {
    const { team } = req

    // TODO: Add pagination
    const publicRaces = await db.Race.findAll({
      where: {
        TeamId: team.id,
        is_public: {
          [db.Sequelize.Op.eq]: true
        }
      },
      order: [
        ['event_time', 'DESC']
      ]
    })

    return returnSuccess(res, {
      team,
      public_races: publicRaces
    })
  } catch (err) {
    console.error('Error Viewing User Teams')
    return errorHandler(res, err)
  }
}

/**
 * Get public race info
 * @param {*} req : express req
 * @param {*} res : express res
 * @returns response
 */
export const getPublicRaceInfo = async (req, res) => {
  try {
    const { team, race } = req

    const results = await findFullResults(team, race)

    return returnSuccess(res, {
      team,
      race,
      results,
      time_zone_offset_ms: new Date().getTimezoneOffset() * 60 * 1000
    })
  } catch (err) {
    console.error('Error Viewing Results')
    return errorHandler(res, err)
  }
}
