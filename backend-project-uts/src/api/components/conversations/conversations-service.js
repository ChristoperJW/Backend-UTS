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
  const result = await conversationsRepository.deleteMessage(messageId, userId);

  if (result.deletedCount === 0) {
    throw new Error('Gagal menghapus pesan');
  }

  return result;
}

async function removeFullConversation(conversationId, userId) {
  const deleted = await conversationsRepository.deleteConversation(
    conversationId,
    userId
  );

  if (!deleted) {
    throw new Error('Percakapan tidak ditemukan');
  }

  await conversationsRepository.deleteMessagesByConversationId(conversationId);
  return deleted;
}

module.exports = {
  getConversations,
  createConversation,
  getMessages,
  sendMessage,
  removeFullConversation,
  removeMessage,
};
