const { DataTypes } = require('sequelize');

const { connectiondb } = require('../config/dbConnection.js');

const Libros = connectiondb.define('libros', {
    nombre: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    autor: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    categoria: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    'año-publicacion': {
        type: DataTypes.DATE,
        allowNull: false
    },
    ISBN: {
        type: DataTypes.STRING(13),
        allowNull: false,
        unique: true
    },

},
{
    tableName: 'libros', timestamps: false
}
);

module.exports = Libros;