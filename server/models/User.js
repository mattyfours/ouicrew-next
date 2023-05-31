import { Sequelize, DataTypes } from 'sequelize'

export default (sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    hash: {
      type: DataTypes.STRING,
      allowNull: false
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: false
    },
    session_token: {
      type: DataTypes.STRING,
      allowNull: true
    },
    session_token_expiration: {
      type: DataTypes.BIGINT,
      allowNull: true
    }
  })

  // Certificate.associate = ({
  //   Shop,
  //   Error
  // }) => {
  //   Certificate.belongsTo(Shop)
  //   Certificate.hasMany(Error, { onDelete: 'CASCADE', as: 'errors' })
  // }

  return User
}
