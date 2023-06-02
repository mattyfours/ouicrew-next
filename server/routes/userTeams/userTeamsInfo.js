import errorHandler from '../../helpers/errorHandler.js'
import { returnSuccess } from '../../helpers/returnStatus.js'

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
    console.error('Error Getting User Info')
    return errorHandler(res, err)
  }
}
