import errorHandler from '../helpers/errorHandler.js'
import validator from 'validator'
import { returnErrorStatusCode } from '../helpers/returnStatus.js'

export const userRegisterValidation = (req, res, next) => {
  try {
    const {
      email,
      username,
      password
    } = req.body

    const errors = []

    if (typeof email === 'undefined' || !validator.isEmail(email)) {
      errors.push({
        path: 'email',
        message: 'Invalid Email Address'
      })
    }

    if (typeof username === 'undefined' || username.length > 120) {
      errors.push({
        path: 'username',
        message: 'Invalid Username'
      })
    }

    if (
      typeof password === 'undefined' ||
      !validator.isStrongPassword(
        password,
        {
          minLength: 8,
          minLowercase: 0,
          minUppercase: 0,
          minNumbers: 1,
          minSymbols: 1,
          returnScore: false,
          pointsPerUnique: 1,
          pointsPerRepeat: 0.5,
          pointsForContainingLower: 0,
          pointsForContainingUpper: 0,
          pointsForContainingNumber: 10,
          pointsForContainingSymbol: 10
        }
      )
    ) {
      errors.push({
        path: 'password',
        message: 'Password must be a min of 8 characters with 1 special character and 1 number'
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

export const userLoginValidation = (req, res, next) => {
  try {
    const {
      username,
      password
    } = req.body

    const errors = []

    if (typeof username === 'undefined' || username.length === 0) {
      errors.push({
        path: 'username',
        message: 'Empty Username'
      })
    }

    if (typeof password === 'undefined' || password.length === 0) {
      errors.push({
        path: 'password',
        message: 'Empty Password'
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
