const { DataTypes } = require('sequelize');
const sequelize = require('../database/db-config');

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(64),
        allowNull: false,
    },
    state: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: true
    }
}, {
    tableName: 'Users'
});

module.exports = User;