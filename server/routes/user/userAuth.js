import errorHandler from '../../helpers/errorHandler.js'
import sendEmail from '../../utils/sendEmail.js'

export const teamLogin = async (req, res) => {
  try {
    return res
      .status(200)
      .json({ hi: 'hey' })
  } catch (err) {
    return errorHandler(res, err)
  }
}
export const userRegister = async (req, res) => {
  try {
    const {
      email
    } = req.body

    console.log(req.body)

    await sendEmail(email)

    // const userWithEmail = db.us

    return res
      .status(200)
      .json({ hi: 'hey' })
  } catch (err) {
    return errorHandler(res, err)
  }
}
