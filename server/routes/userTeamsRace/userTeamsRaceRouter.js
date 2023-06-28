import express from 'express'
import {
  deleteRaceEntry,
  getRaceInfo,
  getRaceOfficiate,
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

userTeamsRaceRouter.get('/:raceId/officiate',
  raceIdValidation,
  getRaceOfficiate
)

userTeamsRaceRouter.post('/:raceId/entry',
  raceIdValidation,
  raceEntryCreateNewValidation,
  postRaceEntry
)

userTeamsRaceRouter.delete('/:raceId/entry/:entryId',
  raceIdValidation,
  deleteRaceEntry
)

export default userTeamsRaceRouter
