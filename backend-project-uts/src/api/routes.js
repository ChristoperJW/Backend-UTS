const express = require('express');

const users = require('./components/users/users-route');
const messages = require('./components/messages/messages-route');

module.exports = () => {
  const app = express.Router();
  users(app);
  messages(app);

  return app;
};
