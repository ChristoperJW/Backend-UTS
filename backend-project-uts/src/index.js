/* eslint-disable prettier/prettier */
require('dotenv').config();

const app = require('./core/server');
const { env, port } = require('./core/config');
const logger = require('./core/logger')('app');

const server = app.listen(port, (err) => {
  if (err) {
    logger.fatal(err, 'Failed to start the server.');
    process.exit(1);
  } else {
    logger.info(`Server runs at port ${port} in ${env} environment`);
  }
});

process.on('uncaughtException', (err) => {
  logger.fatal(err, 'Uncaught exception.');

  // Shutdown gracefully
  server.close(() => process.exit(1));

  setTimeout(() => process.abort(), 1000).unref();
});
