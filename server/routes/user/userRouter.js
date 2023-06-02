import express from 'express'
import {
  postUserLogin,
  postUserRegister,
  postUserResetPassword,
  postUserResetPasswordRequest
} from './userAuth.js'
import {
  userLoginValidation,
  userRegisterValidation,
  userResetPasswordRequestValidation,
  userResetPasswordValidation
} from '../../middleware/userAuthValidation.js'
import { getUserinfo } from './userInfo.js'
import { userSessionValidation } from '../../middleware/userSessionValidation.js'

const userRouter = express.Router()

// Auth Routes
userRouter.post('/register', userRegisterValidation, postUserRegister)
userRouter.post('/login', userLoginValidation, postUserLogin)
userRouter.post('/reset-password-request', userResetPasswordRequestValidation, postUserResetPasswordRequest)
userRouter.post('/reset-password', userResetPasswordValidation, postUserResetPassword)
// userRouter.get('/login', teamLogin)

// User Info
userRouter.get('/:userId', userSessionValidation, getUserinfo)

export default userRouter
