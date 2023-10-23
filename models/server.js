const express = require('express');
const cors = require('cors');
const sequelize = require('../database/db-config');


class Server {

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;

    this.paths = {
      auth: '/api/auth',
      users: '/api/users'
    };

    this.connectToDB();
    this.middlewares();
    this.syncModels();
    this.routes();
  }

  async connectToDB() {
    try {
      sequelize.authenticate().then(() => {
        console.log('Database successfully connected');
      }).catch((error) => {
        console.error('Unable to connect to the database:', error);
      });
      // If the database connection is successful, proceed to sync models.
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }

  syncModels() {
    // Synchronize the models
    sequelize.sync()
      .then(() => {
        console.log('Models have been synchronized');
      })
      .catch((error) => {
        console.error('Unable to synchronize the models:', error);
      });
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Read and parse body
    this.app.use(express.json());

    // Public directory
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.paths.auth, require('../routes/auth'));
    this.app.use(this.paths.users, require('../routes/users'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening at http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;