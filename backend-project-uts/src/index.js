/* eslint-disable prettier/prettier */
require('dotenv').config();

const mongoose = require('mongoose');
const config = require('./core/config');
const app = require('./core/server');
const { env, port } = require('./core/config');
const logger = require('./core/logger')('app');

const dbUri = `${process.env.DB_CONNECTION}/${process.env.DB_NAME}`;



const seedDatabase = require('./seeder');

const server = app.listen(port, async (err) => {
  if (err) {
    logger.fatal(err, 'Failed to start the server.');
    process.exit(1);
  } else {
    logger.info(`Server runs at port ${port} in ${env} environment`);
  }
});

mongoose
  .connect(dbUri, config.database.options)
  .then(async () => {
    console.log('Connected to MongoDB...');

    await seedDatabase();

  })
  .catch((err) => {
    console.error('Could not connect to MongoDB', err);
  });


process.on('uncaughtException', (err) => {
  logger.fatal(err, 'Uncaught exception.');

  // Shutdown gracefully
  server.close(() => process.exit(1));

  setTimeout(() => process.abort(), 1000).unref();
});
