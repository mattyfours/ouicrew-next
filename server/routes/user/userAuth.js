import { pbkdf2Sync, randomBytes } from 'crypto'
import errorHandler from '../../helpers/errorHandler.js'
import { returnErrorStatusCode, returnSuccess } from '../../helpers/returnStatus.js'
import db from '../../models/database.js'
import sendEmail from '../../utils/sendEmail.js'

export const userLogin = async (req, res) => {
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

    const weekInMilliseconds = 1000 * 60 * 60 * 24 * 7

    await userToLogIn.update({
      session_token: randomBytes(16).toString('hex'),
      session_token_expiration: Date.now() + weekInMilliseconds
    })

    return returnSuccess(res, {
      user: {
        email: userToLogIn.email,
        username: userToLogIn.username,
        sessionToken: userToLogIn.session_token,
        sessionTokenExpiration: userToLogIn.session_token_expiration
      }
    })
  } catch (err) {
    return errorHandler(res, err)
  }
}

export const userRegister = async (req, res) => {
  try {
    const {
      email,
      username,
      password
    } = req.body

    const salt = randomBytes(16).toString('hex')
    const hash = pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')

    const [newUser, createdNewUser] = await db.User.findOrCreate({
      where: db.Sequelize.or(
        {
          email: {
            [db.Sequelize.Op.ilike]: email
          }
        },
        {
          username: {
            [db.Sequelize.Op.ilike]: username
          }
        }
      ),
      defaults: {
        email,
        username,
        salt,
        hash
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
    return errorHandler(res, err)
  }
}
