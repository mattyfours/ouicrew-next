import errorHandler from '../../helpers/errorHandler.js'
import { returnSuccess } from '../../helpers/returnStatus.js'
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
    const { team, race, clientServerTimeDiff } = req

    const results = await findFullResults(team, race)

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
          ],
          [
            db.sequelize.literal(`(
              SELECT category
                FROM "TeamRacingStandards" AS standard
                WHERE
                    standard.id = "RaceEntry".racing_standard_id
            )`),
            'racing_standard_category'
          ]
        ]
      }
    })

    return returnSuccess(res, {
      team,
      race,
      results,
      entries,
      client_server_time_diff: clientServerTimeDiff
    })
  } catch (err) {
    console.error('Error Viewing Results')
    return errorHandler(res, err)
  }
}
