import { Sequelize, DataTypes } from 'sequelize'

export default (sequelize) => {
  const Race = sequelize.define('Race', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    event_time: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    event_date: {
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
    }
  })

  Race.associate = ({
    Team
  }) => {
    Race.belongsTo(Team)
  }

  return Race
}
