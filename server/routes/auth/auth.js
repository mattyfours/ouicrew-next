import express from 'express'

const authRouter = express.Router()

authRouter.get('/login', (req, res, next) => {
  res.render('login')
})

export default authRouter
