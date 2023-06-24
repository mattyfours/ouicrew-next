import { Sequelize, DataTypes } from 'sequelize'

export default (sequelize) => {
  const Team = sequelize.define('Team', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    editor_access_code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    viewer_access_code: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })

  Team.associate = ({
    TeamMember,
    Team
  }) => {
    Team.hasMany(TeamMember, { onDelete: 'CASCADE', as: 'TeamMembers' })
    Team.hasMany(TeamMember, { onDelete: 'CASCADE', as: 'Teams' })
  }

  return Team
}
