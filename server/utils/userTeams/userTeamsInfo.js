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
    const { user, userTeams } = req

    return returnSuccess(res, {
      user: {
        email: user.email,
        username: user.username
      },
      teams: userTeams
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
      racingStandards
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
        is_editor: true,
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

/**
 * Create a new team
 * @param {*} req : express req
 * @param {*} res : express res
 * @returns response
 */
export const postJoinATeam = async (req, res) => {
  try {
    const { user } = req

    const {
      teamId,
      accessCode
    } = req.body

    const team = await db.Team.findOne({
      where: {
        id: teamId
      }
    })

    if (team === null) {
      return returnErrorStatusCode(422, res, [{ path: 'team', message: 'Team does not exist' }])
    }

    if (
      team.editor_access_code !== accessCode &&
      team.viewer_access_code !== accessCode
    ) {
      return returnErrorStatusCode(422, res, [{ path: 'team', message: 'Invalid access code' }])
    }

    const [teamMember, createdNewTeamMember] = await db.TeamMember.findOrCreate({
      where: {
        TeamId: team.id,
        UserId: user.id
      },
      defaults: {
        is_admin: false,
        is_editor: accessCode === team.editor_access_code,
        TeamId: team.id,
        UserId: user.id
      }
    })

    if (createdNewTeamMember === false) {
      await teamMember.update({ is_editor: accessCode === team.editor_access_code })
    }

    return returnSuccess(res, {
      team: {
        teamId: team.id,
        name: team.name
      },
      message: `Success! You are now a member of ${team.name}`
    })
  } catch (err) {
    console.error('Error Creating New team')
    return errorHandler(res, err)
  }
}

/**
 * Get Info For a Certain Team
 * @param {*} req : express req
 * @param {*} res : express res
 * @returns response
 */
export const getUserTeam = async (req, res) => {
  try {
    const { user, team } = req

    // TODO: Add Pagination
    const races = await db.Race.findAll({
      where: {
        TeamId: team.id
      }
    })

    return returnSuccess(res, {
      user: {
        email: user.email,
        username: user.username
      },
      team,
      races
    })
  } catch (err) {
    console.error('Error Viewing User Team')
    return errorHandler(res, err)
  }
}
