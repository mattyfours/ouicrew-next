import express from 'express'
import { getUserTeams } from './userTeamsInfo.js'

const userTeamsRouter = express.Router()

// Auth Routes
userTeamsRouter.get('/', getUserTeams)

export default userTeamsRouter
