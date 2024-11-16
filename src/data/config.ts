const fs = require('fs');
const path = require('path');

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/config/config.json')[env];

import { Dialect, Sequelize } from 'sequelize'

const dbName = config.database as string
const dbUser = config.username as string
const dbHost = config.host
const dbDriver = config.dialect as Dialect
const dbPassword = config.password as string

const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: dbDriver
})

export default sequelizeConnection
