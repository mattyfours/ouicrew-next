import express from 'express'
import {
  userRegister
} from './userAuth.js'

const userRouter = express.Router()

// Auth Routes
userRouter.put('/', userRegister)
// userRouter.get('/login', teamLogin)

export default userRouter
