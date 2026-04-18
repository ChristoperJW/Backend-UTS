const express = require('express');
const messagesControllers = require('./messages-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/', route);

  route.get('/conversations', messagesControllers.getConversations);
  route.post('/conversations', messagesControllers.createConversation);
  route.get(
    '/conversations/:id/messages',
    messagesControllers.getMessagesByConversation
  );
  route.post('/messages', messagesControllers.sendMessage);
};
