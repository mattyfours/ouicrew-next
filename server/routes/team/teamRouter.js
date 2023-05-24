import express from 'express'
import {
  teamLogin,
  teamRegister
} from './teamAuth.js'

const teamRouter = express.Router()

// Auth Routes
teamRouter.get('/register', teamRegister)
teamRouter.get('/login', teamLogin)

export default teamRouter
