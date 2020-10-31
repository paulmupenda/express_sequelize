const Sequelize = require('sequelize');
const config = require('config');

const db = new Sequelize(config.get('database'),config.get('username'),config.get('password'),{
    host:'localhost',
    port: 3306,
    dialect:'mysql'
})


module.exports = db;
