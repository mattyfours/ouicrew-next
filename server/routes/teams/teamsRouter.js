import express from 'express'
import { getAllTeams } from './teamsInfo.js'
const teamsRouter = express.Router()

// Auth Routes
teamsRouter.get('/', getAllTeams)

export default teamsRouter
