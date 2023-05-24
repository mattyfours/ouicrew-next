import { Sequelize, DataTypes } from 'sequelize'
import pg from 'pg'
import Team from './Team.js'

//  models
const { Op } = Sequelize
const db = {}
let sequelize = {}

const {
  NODE_ENV,
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USER_NAME,
  DATABASE_URL
} = process.env

pg.defaults.ssl = NODE_ENV === 'production'

sequelize =
  NODE_ENV === 'development'
    ? new Sequelize({
      database: DB_NAME,
      username: DB_USER_NAME,
      password: DB_PASSWORD,
      dialect: 'postgres',
      logging: false,
      options: {
        host: DB_HOST,
        port: DB_PORT,
        dialect: 'postgres'
      }
    })
    : new Sequelize(DATABASE_URL, {
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      }
    })

db.Team = Team(sequelize, Op)
// db.Certificate = Certificate(sequelize, DataTypes, Op)
// db.Error = Error(sequelize, DataTypes, Op)
// db.Receipt = Receipt(sequelize, DataTypes, Op)
// db.ReceiptError = ReceiptError(sequelize, DataTypes, Op)

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.Sequelize = Sequelize
db.sequelize = sequelize

export default db
