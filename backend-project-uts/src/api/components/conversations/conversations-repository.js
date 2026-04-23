const mongoose = require('mongoose');
const { Conversations, Messages } = require('../../../models');

async function getConversations(userId) {
  return Conversations.find({ participants: userId }).populate(
    'participants',
    'fullName email'
  );
}

async function createConversation(senderId, receiverId) {
  const existingConversation = await Conversations.findOne({
    participants: { $all: [senderId, receiverId] },
  });

  if (existingConversation) return existingConversation;

  const newConversation = new Conversations({
    participants: [senderId, receiverId],
  });

  return newConversation.save();
}

async function getMessages(conversationId) {
  return Messages.find({ conversationId }).sort({ createdAt: 1 });
}

async function sendMessage(conversationId, senderId, text) {
  const newMessage = new Messages({
    conversationId,
    senderId,
    text,
  });

  return newMessage.save();
}

async function deleteMessage(messageId, userId) {
  return Messages.deleteOne({ _id: messageId, senderId: userId });
}

async function deleteConversation(conversationId, userId) {
  return Conversations.findOneAndDelete({
    _id: conversationId,
    participants: userId,
  });
}

async function deleteMessagesByConversationId(conversationId) {
  return Messages.deleteMany({
    conversationId: new mongoose.Types.ObjectId(conversationId),
  });
}

module.exports = {
  getConversations,
  createConversation,
  getMessages,
  sendMessage,
  deleteMessage,
  deleteConversation,
  deleteMessagesByConversationId,
};
