const express = require('express');
const conversationsController = require('./conversations-controller');
const { verifyToken } = require('../../../utils/jwt');

const route = express.Router();

module.exports = (app) => {
  app.use('/conversations', route);

  route.post('/', verifyToken, conversationsController.createConversation);
  route.get('/:id/messages', verifyToken, conversationsController.getMessages);
  route.post('/messages', verifyToken, conversationsController.sendMessage);
  route.delete('/:id', verifyToken, conversationsController.deleteConversation);
  route.delete(
    '/messages/:messageId',
    verifyToken,
    conversationsController.deleteMessage
  );
};
