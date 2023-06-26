import express from 'express'
import {
  getUserTeam,
  getUserTeams,
  postCreateUserTeam,
  postJoinATeam
} from './userTeams.js'
import {
  teamsCreateNewValidation, teamsJoinValidation
} from '../../middleware/teamsValidation.js'
import { userTeamValidation } from '../../middleware/userTeamValidation.js'

const userTeamsRouter = express.Router()

// Auth Routes
userTeamsRouter.get('/', getUserTeams)
userTeamsRouter.post('/', teamsCreateNewValidation, postCreateUserTeam)
userTeamsRouter.post('/join', teamsJoinValidation, postJoinATeam)
userTeamsRouter.get('/:teamId', userTeamValidation, getUserTeam)

export default userTeamsRouter
