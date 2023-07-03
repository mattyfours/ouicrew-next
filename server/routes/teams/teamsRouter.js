import express from 'express'
import {
  getAllTeams,
  getPublicRaceInfo,
  getTeamPublicInfo
} from './teamsInfo.js'
import {
  validateAndAddTeamToReq,
  validateRaceIsPublic
} from '../../middleware/publicTeamValidation.js'
const teamsRouter = express.Router()

// Auth Routes
teamsRouter.get(
  '/',
  getAllTeams
)

teamsRouter.get(
  '/:teamId',
  validateAndAddTeamToReq,
  getTeamPublicInfo
)

teamsRouter.get(
  '/:teamId/races/:raceId',
  validateAndAddTeamToReq,
  validateRaceIsPublic,
  getPublicRaceInfo
)

export default teamsRouter
