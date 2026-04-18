const conversationsRepository = require('./conversations-repository');

async function getConversations(userId) {
  return conversationsRepository.getConversations(userId);
}

async function createConversation(senderId, receiverId) {
  return conversationsRepository.createConversation(senderId, receiverId);
}

async function getMessages(conversationId) {
  return conversationsRepository.getMessages(conversationId);
}

async function sendMessage(conversationId, senderId, text) {
  return conversationsRepository.sendMessage(conversationId, senderId, text);
}

module.exports = {
  getConversations,
  createConversation,
  getMessages,
  sendMessage,
};
