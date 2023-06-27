import errorHandler from '../helpers/errorHandler.js'
import { returnErrorStatusCode } from '../helpers/returnStatus.js'
import validator from 'validator'
import db from '../models/database.js'

/**
 * Ensure User is part of the team
 * @param {*} req : express req
 * @param {*} res : express res
 * @returns express next || error response
 */
export const userTeamValidation = async (req, res, next) => {
  try {
    const {
      teamId
    } = req.params

    const {
      userTeams
    } = req

    const errors = []

    if (typeof teamId === 'undefined' || !validator.isUUID(teamId)) {
      errors.push({
        path: 'teamId',
        message: 'Path is missing a valid teamId'
      })
    }

    // If token or user id don't exist, early return errors
    if (errors.length !== 0) { return returnErrorStatusCode(422, res, errors) }

    const team = await db.Team.findOne({
      where: {
        id: teamId
      }
    })

    const teamInUserTeams = userTeams.find(findTeam => findTeam.id === team?.id)

    // If user is not found, early return with invalid session error
    if (!team || typeof teamInUserTeams === 'undefined') {
      errors.push({
        path: 'team',
        message: 'Can not access team'
      })
      return returnErrorStatusCode(422, res, errors)
    }

    req.team = {
      is_team_admin: teamInUserTeams.is_team_admin,
      is_team_editor: teamInUserTeams.is_team_editor,
      id: team.id,
      name: team.name
    }

    return errors.length > 0
      ? returnErrorStatusCode(422, res, errors)
      : next()
  } catch (err) {
    console.error(err)
    return errorHandler(res, err)
  }
}

export const userTeamsIsEditorValidation = (req, res, next) => {
  try {
    const {
      team
    } = req

    const errors = []

    if (
      typeof team?.is_team_editor === 'undefined' ||
      team.is_team_editor === false
    ) {
      errors.push({
        path: 'team',
        message: 'Invalid Team'
      })
    }

    return errors.length > 0
      ? returnErrorStatusCode(422, res, errors)
      : next()
  } catch (err) {
    console.error(err)
    return errorHandler(res, err)
  }
}
