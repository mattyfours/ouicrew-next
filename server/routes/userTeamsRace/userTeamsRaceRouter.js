import express from 'express'
import {
  getRaceInfo,
  postCreateRace
} from './userTeamsRace.js'

import { raceCreateNewValidation } from '../../middleware/racesValidation.js'
import { userTeamsIsEditorValidation } from '../../middleware/userTeamValidation.js'

const userTeamsRaceRouter = express.Router()

userTeamsRaceRouter.post('/',
  userTeamsIsEditorValidation,
  raceCreateNewValidation,
  postCreateRace
)

userTeamsRaceRouter.get('/:raceId',
  getRaceInfo
)

export default userTeamsRaceRouter
