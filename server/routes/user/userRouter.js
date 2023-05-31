import express from 'express'
import {
  userLogin,
  userRegister
} from './userAuth.js'
import { userLoginValidation, userRegisterValidation } from '../../middleware/userAuthValidation.js'

const userRouter = express.Router()

// Auth Routes
userRouter.post('/register', userRegisterValidation, userRegister)
userRouter.post('/login', userLoginValidation, userLogin)
// userRouter.get('/login', teamLogin)

export default userRouter
