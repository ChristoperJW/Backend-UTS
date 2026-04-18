const express = require('express');

const users = require('./components/users/users-route');
const auth = require('./components/auth/auth-route');
const conversations = require('./components/conversations/conversations-route');
const posts = require('./components/posts/posts-route');

module.exports = () => {
  const app = express.Router();

  users(app);
  auth(app);
  conversations(app);
  posts(app);

  return app;
};
