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
async function removeMessage(messageId, userId) {
  const deleted = await conversationsRepository.deleteMessage(
    messageId,
    userId
  );
  if (!deleted) {
    throw new Error('Pesan tidak ditemukan atau kamu tidak punya akses.');
  }
  return deleted;
}

module.exports = {
  getConversations,
  createConversation,
  getMessages,
  sendMessage,
  removeMessage,
};
