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
    },
    team_email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    team_password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })

  // Certificate.associate = ({
  //   Shop,
  //   Error
  // }) => {
  //   Certificate.belongsTo(Shop)
  //   Certificate.hasMany(Error, { onDelete: 'CASCADE', as: 'errors' })
  // }

  return Team
}
