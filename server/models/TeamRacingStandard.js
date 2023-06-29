import { Sequelize, DataTypes } from 'sequelize'

export default (sequelize) => {
  const TeamRacingStandard = sequelize.define('TeamRacingStandard', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    time_in_ms: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    distance: {
      type: DataTypes.BIGINT,
      allowNull: false
    }
  })

  TeamRacingStandard.associate = ({
    Team,
    RaceEntry
  }) => {
    TeamRacingStandard.belongsTo(Team)
    TeamRacingStandard.belongsToMany(RaceEntry, { through: 'TeamRacingStandardsRaceEntries' })
  }

  return TeamRacingStandard
}
