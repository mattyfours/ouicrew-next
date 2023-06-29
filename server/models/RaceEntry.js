import { Sequelize, DataTypes } from 'sequelize'

export default (sequelize) => {
  const RaceEntry = sequelize.define('RaceEntry', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })

  RaceEntry.associate = ({
    Race,
    EntryResult,
    TeamRacingStandard
  }) => {
    RaceEntry.belongsTo(Race)
    RaceEntry.hasMany(EntryResult, { onDelete: 'CASCADE', as: 'EntryResults' })
    RaceEntry.hasOne(TeamRacingStandard)
  }

  return RaceEntry
}
