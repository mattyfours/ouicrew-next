/**
 * Return a status response with a custom message
 * @param {*} res : express res
 * @param {object} data : data to return
 * @returns 200 response
 */
export const returnSuccess = (res, data = {}) => res
  .status(200)
  .json(data)

/**
 * Return a status response with a custom message
 * @param {number} statusCode : status code: 404, 422
 * @param {*} res : express res
 * @param {object/array} errors : errors to return
 * @returns statuscode response
 */
export const returnErrorStatusCode = (statusCode, res, errors) => res
  .status(statusCode)
  .json({ error: errors })
