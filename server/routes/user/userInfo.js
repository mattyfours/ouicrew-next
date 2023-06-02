import errorHandler from '../../helpers/errorHandler.js'
import { returnSuccess } from '../../helpers/returnStatus.js'

/**
 * Get Main User Info
 * @param {*} req : express req
 * @param {*} res : express res
 * @returns response
 */
export const getUserinfo = async (req, res) => {
  try {
    const { user, userTeamIds } = req

    return returnSuccess(res, {
      user: {
        email: user.email,
        username: user.username
      },
      userTeamIds
    })
  } catch (err) {
    console.error('Error Getting User Info')
    return errorHandler(res, err)
  }
}
