import errorHandler from '../../helpers/errorHandler.js'
import { returnErrorStatusCode, returnSuccess } from '../../helpers/returnStatus.js'
import db from '../../models/database.js'

/**
 * Create a new race
 * @param {*} req : express req
 * @param {*} res : express res
 * @returns response
 */
export const postCreateResult = async (req, res) => {
  try {
    // const { team } = req

    return returnSuccess(res, {
      message: 'Result has been saved'
    })
  } catch (err) {
    console.error('Error Creating New Race')
    return errorHandler(res, err)
  }
}
