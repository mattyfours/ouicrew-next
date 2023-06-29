import express from 'express'
import { postCreateResult } from './raceResults.js'
import { createEntryResultValidation } from '../../middleware/entryResultValidation.js'

const raceResultsRouter = express.Router()

raceResultsRouter.post('/',
  createEntryResultValidation,
  postCreateResult
)

export default raceResultsRouter
