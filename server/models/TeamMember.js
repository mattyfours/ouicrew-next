import { Sequelize, DataTypes } from 'sequelize'

export default (sequelize) => {
  const TeamMember = sequelize.define('TeamMember', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    is_editor: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  })

  TeamMember.associate = ({
    Team,
    User
  }) => {
    TeamMember.belongsTo(Team)
    TeamMember.belongsTo(User)
  }

  return TeamMember
}
