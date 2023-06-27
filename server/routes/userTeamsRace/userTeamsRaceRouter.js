import express from 'express'
import {
  getRaceInfo,
  postCreateRace,
  postRaceEntry
} from './userTeamsRace.js'

import { raceCreateNewValidation, raceIdValidation } from '../../middleware/racesValidation.js'
import { userTeamsIsEditorValidation } from '../../middleware/userTeamValidation.js'
import { raceEntryCreateNewValidation } from '../../middleware/raceEntryValidation.js'

const userTeamsRaceRouter = express.Router()

userTeamsRaceRouter.post('/',
  userTeamsIsEditorValidation,
  raceCreateNewValidation,
  postCreateRace
)

userTeamsRaceRouter.get('/:raceId',
  raceIdValidation,
  getRaceInfo
)

userTeamsRaceRouter.post('/:raceId/entry',
  raceIdValidation,
  raceEntryCreateNewValidation,
  postRaceEntry
)

export default userTeamsRaceRouter
