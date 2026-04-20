const express = require('express');

const auth = require('./components/auth/auth-route');
const comments = require('./components/comments/comments-route');
const conversations = require('./components/conversations/conversations-route');
const feeds = require('./components/feeds/feeds-route');
const posts = require('./components/posts/posts-route');
const users = require('./components/users/users-route');

module.exports = () => {
  const app = express.Router();

  auth(app);
  comments(app);
  conversations(app);
  feeds(app);
  posts(app);
  users(app);

  return app;
};
