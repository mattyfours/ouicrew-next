import express from 'express'
import {
  postUserLogin,
  postUserRegister
} from './userAuth.js'
import { userLoginValidation, userRegisterValidation } from '../../middleware/userAuthValidation.js'
import { getUserinfo } from './userInfo.js'
import { userSessionValidation } from '../../middleware/userSessionValidation.js'

const userRouter = express.Router()

// Auth Routes
userRouter.post('/register', userRegisterValidation, postUserRegister)
userRouter.post('/login', userLoginValidation, postUserLogin)
// userRouter.get('/login', teamLogin)

// User Info
userRouter.get('/:userId', userSessionValidation, getUserinfo)

export default userRouter
