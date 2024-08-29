const { DataTypes } = require('sequelize');
const { Sequelize } = require('sequelize');

const database = process.env.DB_NAME;
const userdb = process.env.DB_USER;
const passwordb = process.env.DB_PASSWORD;
const hostdb = process.env.DB_HOST;

const connectiondb = new Sequelize( database, userdb, passwordb,{
 hostdb, dialect: 'mysql' 
});

const db = async() => {
    try {
        await connectiondb.authenticate();
        return console.log('Base de datos sincronizada');
    } catch (error) {
        return console.error('Error al sincronizar la base de datos:', error);
    }
}

module.exports = {connectiondb, db};