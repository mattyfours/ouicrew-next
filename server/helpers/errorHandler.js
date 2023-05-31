const isDev = process.env.NODE_ENV !== 'production'

/**
 * Handle API errors for the proxy endpoint
 * @param {*} res
 * @param {*} error
 * @returns Function
 */
export default async function errorHandler (res, error) {
  let errors = []
  let errorCode = 500
  if (isDev) { console.log(error) }

  if (error.name && error.name === 'SequelizeValidationError') {
    errorCode = 422
    if (error.errors) {
      errors = error.errors.map(({
        message,
        path
      }) => ({
        message,
        path
      }))
    } else {
      errors = [{
        message: error.message,
        path: null
      }]
    }
    return res
      .status(errorCode)
      .json(errors)
  }

  if (error.name && error.name === 'SequelizeDatabaseError') {
    console.log('SequelizeDatabaseError')
  }

  return res
    .status(errorCode)
    .json({})
}
