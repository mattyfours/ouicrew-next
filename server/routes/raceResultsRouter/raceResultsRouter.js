import express from 'express'
import { postCreateResult } from './raceResults.js'

const raceResultsRouter = express.Router()

raceResultsRouter.post('/',
  postCreateResult
)

export default raceResultsRouter
