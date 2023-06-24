import errorHandler from '../../helpers/errorHandler.js'
import { returnErrorStatusCode, returnSuccess } from '../../helpers/returnStatus.js'
import db from '../../models/database.js'

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
