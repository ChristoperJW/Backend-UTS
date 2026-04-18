const express = require('express');

const messagesController = require('./messages-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/messages', route);

  // Get list of messages
  route.get('/', messagesController.getMessages);

  // Create a new message
  route.post('/', messagesController.createMessage);

  // Get message detail
  route.get('/:id', messagesController.getMessage);

  // Update message
  route.put('/:id', messagesController.updateMessage);

  // Delete message
  route.delete('/:id', messagesController.deleteMessage);
};