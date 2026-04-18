const messagesRepository = require('./messages-repository');

async function getConversations(userId) {
  return messagesRepository.getConversations(userId);
}

async function createConversation(userId, participantId) {
  return messagesRepository.createConversation(userId, participantId);
}

async function getMessagesByConversation(conversationId) {
  return messagesRepository.getMessagesByConversation(conversationId);
}

async function sendMessage(conversationId, senderId, content) {
  return messagesRepository.sendMessage(conversationId, senderId, content);
}

module.exports = {
  getConversations,
  createConversation,
  getMessagesByConversation,
  sendMessage,
};
