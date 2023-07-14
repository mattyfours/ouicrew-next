import errorHandler from '../helpers/errorHandler.js'
import validator from 'validator'
import { returnErrorStatusCode } from '../helpers/returnStatus.js'

/**
 * Validate User Register Form
 * @param {*} req : express req
 * @param {*} res : express res
 * @returns express next || error response
 */
export const userRegisterValidation = (req, res, next) => {
  try {
    const {
      email,
      username,
      password,
      agreeToTerms
    } = req.body

    const errors = []

    if (typeof email === 'undefined' || !validator.isEmail(email)) {
      errors.push({
        path: 'email',
        message: 'Invalid Email Address'
      })
    }

    if (
      typeof username === 'undefined' ||
      username.length > 120 ||
      /^[a-z0-9-]+$/.test(username) === false
    ) {
      errors.push({
        path: 'username',
        message: 'Invalid Username. Must only contain lowercase letters, numbers, and dashes.'
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

    if (typeof agreeToTerms === 'undefined' || agreeToTerms !== true) {
      errors.push({
        path: 'agreeToTerms',
        message: 'Must agree to terms'
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

/**
 * Validate User Login Form
 * @param {*} req : express req
 * @param {*} res : express res
 * @returns express next || error response
 */
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

/**
 * Validate Request Reset Token
 * @param {*} req : express req
 * @param {*} res : express res
 * @returns express next || error response
 */
export const userResetPasswordRequestValidation = (req, res, next) => {
  try {
    const {
      username,
      email
    } = req.body

    const errors = []

    if (
      (typeof username === 'undefined' || username.length === 0) &&
      (typeof email === 'undefined' || !validator.isEmail(email))

    ) {
      errors.push({
        path: 'username | email',
        message: 'Empty Username'
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

/**
 * Validate Reset Password
 * @param {*} req : express req
 * @param {*} res : express res
 * @returns express next || error response
 */
export const userResetPasswordValidation = (req, res, next) => {
  try {
    const {
      username,
      resetToken,
      password
    } = req.body

    const errors = []

    if (typeof username === 'undefined' || username.length === 0) {
      errors.push({
        path: 'username',
        message: 'Invalid User'
      })
    }

    if (typeof resetToken === 'undefined' || resetToken.length === 0) {
      errors.push({
        path: 'resetToken',
        message: 'Invalid User'
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

    console.log(errors)

    return errors.length > 0
      ? returnErrorStatusCode(422, res, errors)
      : next()
  } catch (err) {
    console.error(err)
    return errorHandler(res, err)
  }
}
