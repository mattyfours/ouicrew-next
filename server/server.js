import 'dotenv/config'
import express from 'express'

import db from './models/database.js'
// import authRouter from './routes/auth/auth.js'
import teamRouter from './routes/team/teamRouter.js'
import userRouter from './routes/user/userRouter.js'

const {
  SERVER_PORT
} = process.env

const app = express()
app.use(express.json())

// app.use('/auth', authRouter)
app.use('/team', teamRouter)

app.use('/user', userRouter)

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
