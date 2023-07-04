import express from 'express'
import {
  getRacingStandards,
  getUserTeam,
  getUserTeams,
  postCreateUserTeam,
  postJoinATeam,
  postRacingStandards
} from './userTeams.js'
import {
  teamsCreateNewValidation, teamsJoinValidation
} from '../../middleware/teamsValidation.js'
import { userTeamValidation } from '../../middleware/userTeamValidation.js'
import { racingStandardCreateNewValidation } from '../../middleware/racingStandardsValidation.js'

const userTeamsRouter = express.Router()

userTeamsRouter.get('/', getUserTeams)
userTeamsRouter.post('/', teamsCreateNewValidation, postCreateUserTeam)
userTeamsRouter.post('/join', teamsJoinValidation, postJoinATeam)
userTeamsRouter.get('/:teamId', userTeamValidation, getUserTeam)

userTeamsRouter.get(
  '/:teamId/racing-standards',
  userTeamValidation,
  getRacingStandards
)

userTeamsRouter.post(
  '/:teamId/racing-standards',
  userTeamValidation,
  racingStandardCreateNewValidation,
  postRacingStandards
)

export default userTeamsRouter
