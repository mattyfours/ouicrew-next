import express from 'express'
import {
  getUserTeams,
  postCreateUserTeam
} from './userTeamsInfo.js'
import {
  teamsCreateNewValidation
} from '../../middleware/teamsValidation.js'

const userTeamsRouter = express.Router()

// Auth Routes
userTeamsRouter.get('/', getUserTeams)
userTeamsRouter.post('/', teamsCreateNewValidation, postCreateUserTeam)

export default userTeamsRouter
