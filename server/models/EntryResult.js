import { Sequelize, DataTypes } from 'sequelize'

export default (sequelize) => {
  const EntryResult = sequelize.define('EntryResult', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    start_time: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    finish_time: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: null
    },
    total_time: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: null
    },
    checkpoint_times: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: {}
    },
    racing_standard_percentage: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    set: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    }
  })

  EntryResult.associate = ({
    RaceEntry,
    Team,
    Race
  }) => {
    EntryResult.belongsTo(RaceEntry)
    EntryResult.belongsTo(Team)
    EntryResult.belongsTo(Race)
  }

  return EntryResult
}
