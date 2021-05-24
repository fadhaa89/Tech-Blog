const Sequelize = require('sequelize');
//dotenv is installed //
require('dotenv').config();
//const sequelize;
let sequelize;
//process.env//
if (process.env.) {
    sequelize = new Sequelize(process.env.);
} else {
    sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
        host: 'localhost',
        dialect: 'mysql',
        port: 
    });
}

module.exports = sequelize;