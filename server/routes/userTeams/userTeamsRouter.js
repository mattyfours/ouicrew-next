import express from 'express'
import {
  getRacingStandards,
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

userTeamsRouter.get('/', getUserTeams)
userTeamsRouter.post('/', teamsCreateNewValidation, postCreateUserTeam)
userTeamsRouter.post('/join', teamsJoinValidation, postJoinATeam)
userTeamsRouter.get('/:teamId', userTeamValidation, getUserTeam)
userTeamsRouter.get('/:teamId/racing-standards', userTeamValidation, getRacingStandards)

export default userTeamsRouter
