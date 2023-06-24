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
      userId
    } = req.params

    const errors = []

    if (typeof userSessionToken === 'undefined') {
      errors.push({
        path: 'x-ouicrew-session-token',
        message: 'Missing header x-ouicrew-session-token'
      })
    }

    if (typeof userId === 'undefined' || !validator.isUUID(userId)) {
      errors.push({
        path: 'userId',
        message: 'Path is missing a valid userId'
      })
    }

    // If token or user id don't exist, early return errors
    if (errors.length !== 0) { return returnErrorStatusCode(422, res, errors) }

    const user = await db.User.findOne({
      where: {
        id: userId,
        session_token: {
          [db.Sequelize.Op.iLike]: userSessionToken
        },
        session_token_expiration: {
          [db.Sequelize.Op.gte]: Date.now()
        }
      }
    })

    // If user is not found, early return with invalid session error
    if (!user) {
      errors.push({
        path: 'userSessionToken',
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
          teamId: userTeam.TeamId,
          isTeamAdmin: userTeam.is_admin,
          isTeamEditor: userTeam.is_editor,
          teamName: team.name
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
