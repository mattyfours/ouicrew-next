import db from '../models/database.js'

const findFullResults = async (team, race) => {
  const raceResults = await db.EntryResult.findAll({
    where: {
      RaceId: race.id
    }
  })

  const resultsWithEntriesAndStandards = []
  for (const result of raceResults) {
    const entry = await db.RaceEntry.findOne({
      where: {
        id: result.RaceEntryId
      }
    })

    const standard = entry.racing_standard_id === null
      ? {}
      : await db.TeamRacingStandard.findOne({
        where: {
          id: entry.racing_standard_id
        }
      })

    resultsWithEntriesAndStandards.push({
      ...result.dataValues,
      entry,
      standard
    })
  }

  return resultsWithEntriesAndStandards
}

export default findFullResults
