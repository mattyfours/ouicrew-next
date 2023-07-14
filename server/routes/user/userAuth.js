import { pbkdf2Sync, randomBytes } from 'crypto'
import errorHandler from '../../helpers/errorHandler.js'
import { returnErrorStatusCode, returnSuccess } from '../../helpers/returnStatus.js'
import db from '../../models/database.js'
import sendEmail from '../../utils/sendEmail.js'
import { thirtyMinutesInMilliseconds, weekInMilliseconds } from '../../helpers/helpfulValues.js'

const {
  FRONT_END_URL,
  SEND_GRID_TEMPLATE_RESET_PASSWORD
} = process.env

/**
 * User Login
 * @param {*} req : express req
 * @param {*} res : express res
 * @returns response
 */
export const postUserLogin = async (req, res) => {
  try {
    const {
      username,
      password
    } = req.body

    const userToLogIn = await db.User.findOne({
      where: {
        username: {
          [db.Sequelize.Op.eq]: username
        }
      }
    })

    if (!userToLogIn) {
      return returnErrorStatusCode(
        422,
        res,
        [{ path: 'username', message: 'Username or password is incorrect' }]
      )
    }

    const hashedSubmittedPassword = pbkdf2Sync(password, userToLogIn.salt, 1000, 64, 'sha512').toString('hex')

    if (hashedSubmittedPassword !== userToLogIn.hash) {
      return returnErrorStatusCode(
        422,
        res,
        [{ path: 'password', message: 'Username or password is incorrect' }]
      )
    }

    if (
      userToLogIn.session_token === null ||
      userToLogIn.session_token_expiration < Date.now()
    ) {
      await userToLogIn.update({
        session_token: randomBytes(16).toString('hex'),
        session_token_expiration: Date.now() + weekInMilliseconds
      })
    }

    return returnSuccess(res, {
      user: {
        userId: userToLogIn.id,
        email: userToLogIn.email,
        username: userToLogIn.username,
        session_token: userToLogIn.session_token,
        session_token_expiration: userToLogIn.session_token_expiration
      },
      message: `Login successful for ${userToLogIn.username}`
    })
  } catch (err) {
    console.error('Error Loggin In')
    return errorHandler(res, err)
  }
}

/**
 * Log Out
 * @param {*} req : express req
 * @param {*} res : express res
 * @returns response
 */
export const postUserLogOut = async (req, res) => {
  try {
    const { user } = req

    await user.update({
      session_token: null,
      session_token_expiration: null
    })

    return returnSuccess(res, {
      message: 'Success, user has been logged out'
    })
  } catch (err) {
    console.error('Error Registering User')
    return errorHandler(res, err)
  }
}

/**
 * Register a new user
 * @param {*} req : express req
 * @param {*} res : express res
 * @returns response
 */
export const postUserRegister = async (req, res) => {
  try {
    const {
      email,
      username,
      password,
      agreeToTerms
    } = req.body

    const salt = randomBytes(16).toString('hex')
    const hash = pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')

    const findExistingUser = await db.User.findOne({
      where: db.Sequelize.or(
        {
          email: {
            [db.Sequelize.Op.iLike]: email
          }
        },
        {
          username: {
            [db.Sequelize.Op.iLike]: username
          }
        }
      )
    })

    if (findExistingUser !== null) {
      return returnErrorStatusCode(
        422,
        res,
        [{
          path: 'username || email',
          message: 'An account already exists with the username or email'
        }]
      )
    }

    const newUser = await db.User.create({
      email,
      username,
      salt,
      hash,
      agree_to_terms: agreeToTerms
    })

    // await sendEmail(email)

    return returnSuccess(res, {
      user: {
        email: newUser.email,
        username: newUser.username
      },
      message: `Hi ${newUser.username}, welcome to OuiCrew!`
    })
  } catch (err) {
    console.error('Error Registering User')
    return errorHandler(res, err)
  }
}

/**
 * Request Reset Access Token
 * @param {*} req : express req
 * @param {*} res : express res
 * @returns response
 */
export const postUserResetPasswordRequest = async (req, res) => {
  try {
    const {
      username
    } = req.body

    const userToResetPassword = await db.User.findOne({
      where: db.Sequelize.or(
        {
          username: {
            [db.Sequelize.Op.eq]: username
          }
        }
      )
    })

    if (userToResetPassword === null) {
      return returnErrorStatusCode(422, res, [{ path: 'username', message: 'No account exists with the entered username' }])
    }

    await userToResetPassword.update({
      reset_password_token: randomBytes(16).toString('hex'),
      reset_password_token_expiration: Date.now() + thirtyMinutesInMilliseconds
    })

    await sendEmail(
      userToResetPassword.email,
      SEND_GRID_TEMPLATE_RESET_PASSWORD,
      {
        resetUrl: `${FRONT_END_URL}/login/password-reset?reset-token=${userToResetPassword.reset_password_token}`,
        username: userToResetPassword.username,
        resetPasswordToken: userToResetPassword.reset_password_token
      }
    )

    return returnSuccess(res, {
      user: {
        email: userToResetPassword.email,
        username: userToResetPassword.username
      },
      message: `An email has been sent to ${userToResetPassword.email}`
    })
  } catch (err) {
    console.error('Error Registering User')
    return errorHandler(res, err)
  }
}

/**
 * Reset Password
 * @param {*} req : express req
 * @param {*} res : express res
 * @returns response
 */
export const postUserResetPassword = async (req, res) => {
  try {
    const {
      username,
      resetToken,
      password
    } = req.body

    console.log('username', username)

    const userToResetPassword = await db.User.findOne({
      where: {
        username: {
          [db.Sequelize.Op.eq]: username
        },
        reset_password_token: {
          [db.Sequelize.Op.eq]: resetToken
        },
        reset_password_token_expiration: {
          [db.Sequelize.Op.gte]: Date.now()
        }
      }
    })

    if (userToResetPassword === null) {
      return returnErrorStatusCode(422, res, [{ path: 'username or email', message: 'Password reset token has expired' }])
    }

    await userToResetPassword.update({
      hash: pbkdf2Sync(password, userToResetPassword.salt, 1000, 64, 'sha512').toString('hex'),
      reset_password_token: null,
      reset_password_token_expiration: null,
      session_token: null,
      session_token_expiration: null
    })

    return returnSuccess(res, {
      user: {
        email: userToResetPassword.email,
        username: userToResetPassword.username
      },
      message: 'Success, your password has been updated.'
    })
  } catch (err) {
    console.error('Error Registering User')
    return errorHandler(res, err)
  }
}
