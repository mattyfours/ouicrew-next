import errorHandler from '../../helpers/errorHandler.js'
import { returnErrorStatusCode, returnSuccess } from '../../helpers/returnStatus.js'
import db from '../../models/database.js'

/**
 * Get Teams Info for User
 * @param {*} req : express req
 * @param {*} res : express res
 * @returns response
 */
export const getUserTeams = async (req, res) => {
  try {
    const { user } = req

    return returnSuccess(res, {
      user: {
        email: user.email,
        username: user.username
      },
      teams: [

      ]
    })
  } catch (err) {
    console.error('Error Viewing User Teams')
    return errorHandler(res, err)
  }
}

/**
 * Create a new team
 * @param {*} req : express req
 * @param {*} res : express res
 * @returns response
 */
export const postCreateUserTeam = async (req, res) => {
  try {
    const { user } = req

    const {
      name,
      editorAccessCode,
      viewerAccessCode,
      racingStandardsSport
    } = req.body

    const [team, createdNewTeam] = await db.Team.findOrCreate({
      where: {
        name: {
          [db.Sequelize.Op.iLike]: name
        }
      },
      defaults: {
        name,
        editor_access_code: editorAccessCode,
        viewer_access_code: viewerAccessCode
      }
    })

    if (createdNewTeam === false) {
      return returnErrorStatusCode(422, res, [{ path: 'name', message: 'A team already exists with this name' }])
    }

    const [teamMember, createdNewTeamMember] = await db.TeamMember.findOrCreate({
      where: {
        TeamId: team.id,
        UserId: user.id
      },
      defaults: {
        is_admin: true,
        TeamId: team.id,
        UserId: user.id
      }
    })

    if (createdNewTeamMember) {
      await teamMember.update({ is_admin: true })
    }

    return returnSuccess(res, {
      team: {
        teamId: team.id,
        name: team.name
      },
      message: `Team ${team.name} has been created`
    })
  } catch (err) {
    console.error('Error Creating New team')
    return errorHandler(res, err)
  }
}
