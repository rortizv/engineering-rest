const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOSTNAME,
    dialect: 'mysql'
});

// sequelize.authenticate().then(() => {
//     console.log('Database successfully connected');
// }).catch((error) => {
//     console.error('Unable to connect to the database:', error);
// });

module.exports = sequelize;