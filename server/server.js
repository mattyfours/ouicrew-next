import 'dotenv/config'
import express from 'express'
import cors from 'cors'

import db from './models/database.js'
// import authRouter from './routes/auth/auth.js'
import teamRouter from './routes/userTeams/userTeamsRouter.js'
import userRouter from './routes/user/userRouter.js'
import teamsRouter from './routes/teams/teamsRouter.js'
import { userSessionValidation } from './middleware/userSessionValidation.js'
import userTeamsRaceRouter from './routes/userTeamsRace/userTeamsRaceRouter.js'
import { userTeamValidation } from './middleware/userTeamValidation.js'
import { raceIdValidation } from './middleware/racesValidation.js'
import raceResultsRouter from './routes/raceResultsRouter/raceResultsRouter.js'

const {
  SERVER_PORT,
  FRONT_END_URL
} = process.env

const app = express()
app.use(express.json())

app.use(cors({
  origin: function (origin, callback) {
    if (typeof origin === 'undefined' || [FRONT_END_URL].includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}))

// app.use('/auth', authRouter)
app.use(
  '/user',
  userRouter
)

app.use(
  '/user/:userId/teams',
  userSessionValidation,
  teamRouter
)

app.use(
  '/user/:userId/teams/:teamId/race',
  userSessionValidation,
  userTeamValidation,
  userTeamsRaceRouter
)

app.use(
  '/user/:userId/teams/:teamId/race/:raceId/results',
  userSessionValidation,
  userTeamValidation,
  raceIdValidation,
  raceResultsRouter
)

app.use(
  '/teams',
  teamsRouter
)

// sync database
db.sequelize
  .sync()
  .then(() => app.listen(
    SERVER_PORT,
    () => console.log(`Server Running On localhost:${SERVER_PORT}`)
  ))
  .catch((error) => {
    console.error(error)
    return process.exit(0)
  })
