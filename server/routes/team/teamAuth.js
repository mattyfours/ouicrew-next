import errorHandler from '../../helpers/errorHandler.js'

export const teamLogin = async (req, res) => {
  try {
    return res
      .status(200)
      .json({ hi: 'hey' })
  } catch (err) {
    return errorHandler(res, err)
  }
}
export const teamRegister = async (req, res) => {
  try {
    return res
      .status(200)
      .json({ hi: 'hey' })
  } catch (err) {
    return errorHandler(res, err)
  }
}
