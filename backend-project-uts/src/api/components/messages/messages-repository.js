const { Conversation, Message } = require('../../../models');

async function getConversations(userId) {
  return Conversation.find({ participants: userId });
}

async function createConversation(userId, participantId) {
  return Conversation.create({
    participants: [userId, participantId],
  });
}

async function getMessagesByConversation(conversationId) {
  return Message.find({ conversationId }).sort({ createdAt: 1 });
}

async function sendMessage(conversationId, senderId, content) {
  return Message.create({
    conversationId,
    senderId,
    content,
  });
}

module.exports = {
  getConversations,
  createConversation,
  getMessagesByConversation,
  sendMessage,
};
