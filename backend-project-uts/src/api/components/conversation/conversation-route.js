const express = require('express');

const authenticationMiddleware = require('../../middlewares/authentication-middleware');
const conversationController = require('./conversation-controller');

module.exports = () => {
  const router = express.Router();

  router.get('/', authenticationMiddleware, conversationController.getConversations);
  router.post('/', authenticationMiddleware, conversationController.createConversation);
  router.get(
    '/:id/messages',
    authenticationMiddleware,
    conversationController.getMessages
  );

  return router;
};
