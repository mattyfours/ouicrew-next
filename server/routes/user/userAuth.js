import { pbkdf2Sync, randomBytes } from 'crypto'
import errorHandler from '../../helpers/errorHandler.js'
import { returnErrorStatusCode, returnSuccess } from '../../helpers/returnStatus.js'
import db from '../../models/database.js'
import sendEmail from '../../utils/sendEmail.js'
import { thirtyMinutesInMilliseconds, weekInMilliseconds } from '../../helpers/helpfulValues.js'

const {
  FONT_END_DOMAIN,
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
          [db.Sequelize.Op.like]: username
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

    await userToLogIn.update({
      session_token: randomBytes(16).toString('hex'),
      session_token_expiration: Date.now() + weekInMilliseconds
    })

    return returnSuccess(res, {
      user: {
        userId: userToLogIn.id,
        email: userToLogIn.email,
        username: userToLogIn.username,
        sessionToken: userToLogIn.session_token,
        sessionTokenExpiration: userToLogIn.session_token_expiration
      }
    })
  } catch (err) {
    console.error('Error Loggin In')
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

    const [newUser, createdNewUser] = await db.User.findOrCreate({
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
      ),
      defaults: {
        email,
        username,
        salt,
        hash,
        agree_to_terms: agreeToTerms
      }
    })

    if (createdNewUser === false) {
      return returnErrorStatusCode(422, res, [{ path: 'username || email', message: 'An account already exists with the username or email' }])
    }

    // await sendEmail(email)

    return returnSuccess(res, {
      user: {
        email: newUser.email,
        username: newUser.username
      }
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
      email,
      username
    } = req.body

    const userToResetPassword = await db.User.findOne({
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

    if (userToResetPassword === null) {
      return returnErrorStatusCode(422, res, [{ path: 'username or email', message: 'No account exists with the entered username or email' }])
    }

    await userToResetPassword.update({
      reset_password_token: randomBytes(16).toString('hex'),
      reset_password_token_expiration: Date.now() + thirtyMinutesInMilliseconds
    })

    await sendEmail(
      userToResetPassword.email,
      SEND_GRID_TEMPLATE_RESET_PASSWORD,
      {
        resetUrl: `${FONT_END_DOMAIN}/resetPassword/${userToResetPassword.reset_password_token}`,
        username: userToResetPassword.username,
        resetPasswordToken: userToResetPassword.reset_password_token
      }
    )

    return returnSuccess(res, {
      user: {
        email: userToResetPassword.email,
        username: userToResetPassword.username
      },
      passwordResetRequest: `An email has been sent to ${userToResetPassword.email}`
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
      email,
      resetToken,
      password
    } = req.body

    const salt = randomBytes(16).toString('hex')
    const hash = pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')

    const userToResetPassword = await db.User.findOne({
      where: {
        email: {
          [db.Sequelize.Op.iLike]: email
        },
        reset_password_token: {
          [db.Sequelize.Op.iLike]: resetToken
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
      hash,
      reset_password_token: null,
      session_token_expiration: null
    })

    return returnSuccess(res, {
      user: {
        email: userToResetPassword.email,
        username: userToResetPassword.username
      },
      passwordReset: 'Success, your password has been updated.'
    })
  } catch (err) {
    console.error('Error Registering User')
    return errorHandler(res, err)
  }
}
