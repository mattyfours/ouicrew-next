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
    },
    racing_standard_id: {
      type: Sequelize.UUID,
      allowNull: true
    }
  })

  RaceEntry.associate = ({
    Race
  }) => {
    RaceEntry.belongsTo(Race)
  }

  return RaceEntry
}
