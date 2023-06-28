import { Sequelize, DataTypes } from 'sequelize'

export default (sequelize) => {
  const Race = sequelize.define('Race', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    event_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    distance: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    checkpoints: {
      type: DataTypes.INTEGER,
      allowNull: false,
      default: 0
    },
    is_public: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    start_time: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  })

  Race.associate = ({
    Team,
    RaceEntry,
    EntryResult
  }) => {
    Race.belongsTo(Team)
    Race.hasMany(RaceEntry, { onDelete: 'CASCADE', as: 'RaceEntries' })
    Race.hasMany(EntryResult, { onDelete: 'CASCADE', as: 'EntryResults' })
  }

  return Race
}
