import { pbkdf2Sync, randomBytes } from 'crypto'
import errorHandler from '../../helpers/errorHandler.js'
import { returnErrorStatusCode, returnSuccess } from '../../helpers/returnStatus.js'
import db from '../../models/database.js'
import sendEmail from '../../utils/sendEmail.js'
import { weekInMilliseconds } from '../../helpers/helpfulValues.js'

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
      return returnErrorStatusCode(422, res, [{ path: 'username or email', message: 'An account already exists with the username or email' }])
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
