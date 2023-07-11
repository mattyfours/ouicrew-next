import errorHandler from '../helpers/errorHandler.js'
import { returnErrorStatusCode } from '../helpers/returnStatus.js'
import validator from 'validator'
import db from '../models/database.js'
import { weekInMilliseconds } from '../helpers/helpfulValues.js'

/**
 * Validate User Session
 * @param {*} req : express req
 * @param {*} res : express res
 * @returns express next || error response
 */
export const userSessionValidation = async (req, res, next) => {
  try {
    const {
      'x-ouicrew-session-token': userSessionToken
    } = req.headers

    const {
      userId: userHandle
    } = req.params

    const errors = []

    if (typeof userSessionToken === 'undefined') {
      errors.push({
        path: 'userSession',
        message: 'An error occurred. Please try again.'
      })
    }

    if (typeof userHandle === 'undefined') {
      errors.push({
        path: 'userSession',
        message: 'Invalid User'
      })
    }

    // If token or user id don't exist, early return errors
    if (errors.length !== 0) { return returnErrorStatusCode(422, res, errors) }

    const user = await db.User.findOne({
      where: {
        username: {
          [db.Sequelize.Op.like]: userHandle
        },
        session_token: {
          [db.Sequelize.Op.like]: userSessionToken
        },
        session_token_expiration: {
          [db.Sequelize.Op.gte]: Date.now()
        }
      }
    })

    // If user is not found, early return with invalid session error
    if (!user) {
      errors.push({
        path: 'userSession',
        message: 'User session has expired'
      })
      return returnErrorStatusCode(422, res, errors)
    }

    await user.update({
      session_token_expiration: Date.now() + weekInMilliseconds
    })

    req.user = user

    const userTeams = await db.TeamMember.findAll({
      where: {
        UserId: user.id
      }
    })

    req.userTeams = await Promise.all(
      userTeams.map(async userTeam => {
        const team = await db.Team.findOne({
          where: {
            id: userTeam.TeamId
          }
        })

        return {
          id: team.id,
          is_team_admin: userTeam.is_admin,
          is_team_editor: userTeam.is_editor,
          name: team.name,
          handle: team.handle
        }
      })
    )

    return errors.length > 0
      ? returnErrorStatusCode(422, res, errors)
      : next()
  } catch (err) {
    console.error(err)
    return errorHandler(res, err)
  }
}
