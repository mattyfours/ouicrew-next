const isDev = process.env.NODE_ENV !== 'production'

/**
 * Handle API errors for the proxy endpoint
 * @param {*} res
 * @param {*} error
 * @returns Function
 */
export default async function errorHandler (res, error) {
  const errors = []
  const errorCode = 500

  if (isDev) { console.error(error) }

  if (error.name && error.name === 'SequelizeDatabaseError') {
    console.error('SequelizeDatabaseError')
  }

  if (error.name && error.name === 'SequelizeValidationError') {
    const errorToPush = typeof error.errors?.[0] === 'undefined'
      ? error
      : error.errors[0]

    errors.push([
      {
        path: 'SequelizeValidation',
        message: errorToPush.message
      }
    ])
  } else {
    errors.push([
      {
        path: error.name || null,
        message: error.message
      }
    ])
  }

  return res
    .status(errorCode)
    .json({ error: errors })
}
