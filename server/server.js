import 'dotenv/config'
import express from 'express'

import db from './models/database.js'
// import authRouter from './routes/auth/auth.js'
import teamRouter from './routes/team/teamRouter.js'

const {
  SERVER_PORT
} = process.env

const app = express()

// app.use('/auth', authRouter)
app.use('/team', teamRouter)

// sync database
db.sequelize
  .sync()
  .then(() => app.listen(
    SERVER_PORT,
    () => console.log(`Server Running On Port ${SERVER_PORT}`)
  ))
  .catch((error) => {
    console.log(error)
    return process.exit(0)
  })
