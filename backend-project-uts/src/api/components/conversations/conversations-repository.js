const { Conversation, Message } = require('../../../models');

async function getConversations(userId) {
  return Conversation.find({ participants: userId }).populate(
    'participants',
    'full_name email'
  );
}

async function createConversation(senderId, receiverId) {
  const existingConversation = await Conversation.findOne({
    participants: { $all: [senderId, receiverId] },
  });

  if (existingConversation) {
    return existingConversation;
  }

  const newConversation = new Conversation({
    participants: [senderId, receiverId],
  });

  return newConversation.save();
}

async function getMessages(conversationId) {
  return Message.find({ conversationId }).sort({ createdAt: 1 });
}

async function sendMessage(conversationId, senderId, text) {
  const newMessage = new Message({
    conversationId,
    senderId,
    text,
  });

  return newMessage.save();
}

module.exports = {
  getConversations,
  createConversation,
  getMessages,
  sendMessage,
};
