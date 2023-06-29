import express from 'express'
import { postCreateResult, postUpdateResult } from './raceResults.js'
import { createEntryResultValidation, updateEntryResultValidation } from '../../middleware/entryResultValidation.js'

const raceResultsRouter = express.Router()

raceResultsRouter.post('/',
  createEntryResultValidation,
  postCreateResult
)

raceResultsRouter.post('/:resultId',
  updateEntryResultValidation,
  postUpdateResult
)

export default raceResultsRouter
