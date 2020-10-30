'use strict';
const Sequelize = require('sequelize');

const sequelize = new Sequelize('schedule_arranger', 'root', 'pass', {
  dialect: 'mysql',
  host: 'localhost'
})

module.exports = {
  database: sequelize,
  Sequelize: Sequelize
};