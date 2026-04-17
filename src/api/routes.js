const express = require('express');

const comments = require('./components/comments/comments-route');
const feeds = require('./components/feeds/feeds-route');
const posts = require('./components/posts/posts-route');
const users = require('./components/users/users-route');

module.exports = () => {
  const app = express.Router();

  comments(app);
  feeds(app);
  posts(app);
  users(app);

  return app;
};
