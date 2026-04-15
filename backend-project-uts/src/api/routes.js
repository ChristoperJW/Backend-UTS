const express = require('express');

const authRoutes = require('./components/auth/auth-route');
const commentRoutes = require('./components/comment/comment-route');
const conversationRoutes = require('./components/conversation/conversation-route');
const feedRoutes = require('./components/feed/feed-route');
const messageRoutes = require('./components/message/message-route');
const postRoutes = require('./components/post/post-route');
const userRoutes = require('./components/user/user-route');

module.exports = () => {
  const app = express.Router();

  app.use('/auth', authRoutes());
  app.use('/users', userRoutes());
  app.use('/posts', postRoutes());
  app.use('/feed', feedRoutes());
  app.use('/comments', commentRoutes());
  app.use('/conversations', conversationRoutes());
  app.use('/messages', messageRoutes());

  return app;
};
