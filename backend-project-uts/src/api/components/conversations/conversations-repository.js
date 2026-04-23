const mongoose = require('mongoose');
const { Conversation, Message } = require('../../../models');

async function getConversations(userId) {
  return Conversation.find({ participants: userId }).populate(
    'participants',
    'username'
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

async function deleteMessage(messageId, userId) {
  return Message.deleteOne({ _id: messageId, senderId: userId });
}

async function deleteConversation(conversationId, userId) {
  return Conversation.findOneAndDelete({
    _id: conversationId,
    participants: userId,
  });
}

async function deleteMessagesByConversationId(conversationId) {
  return Message.deleteMany({
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
