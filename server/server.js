import 'dotenv/config'
import express from 'express'

import db from './models/database.js'
// import authRouter from './routes/auth/auth.js'
import teamRouter from './routes/userTeams/userTeamsRouter.js'
import userRouter from './routes/user/userRouter.js'
import { userSessionValidation } from './middleware/userSessionValidation.js'

const {
  SERVER_PORT
} = process.env

const app = express()
app.use(express.json())

// app.use('/auth', authRouter)
app.use('/user', userRouter)

app.use('/user/:userId/teams', userSessionValidation, teamRouter)

// sync database
db.sequelize
  .sync()
  .then(() => app.listen(
    SERVER_PORT,
    () => console.log(`Server Running On localhost:${SERVER_PORT}`)
  ))
  .catch((error) => {
    console.log(error)
    return process.exit(0)
  })
