const db = require('../../../models');

const { Conversation, Message } = db;

const conversationPopulate = [
  {
    path: 'participants',
    select: 'email fullName bio avatar followers following createdAt updatedAt',
  },
  {
    path: 'lastMessageId',
    populate: [
      {
        path: 'senderId',
        select: 'email fullName bio avatar followers following createdAt updatedAt',
      },
      {
        path: 'receiverId',
        select: 'email fullName bio avatar followers following createdAt updatedAt',
      },
    ],
  },
];

const messagePopulate = [
  {
    path: 'senderId',
    select: 'email fullName bio avatar followers following createdAt updatedAt',
  },
  {
    path: 'receiverId',
    select: 'email fullName bio avatar followers following createdAt updatedAt',
  },
];

const getConversationsByUserId = async (userId) =>
  Conversation.find({ participants: userId })
    .populate(conversationPopulate)
    .sort({ updatedAt: -1 })
    .lean();

const findConversationBetweenUsers = async (firstUserId, secondUserId) =>
  Conversation.findOne({
    participants: { $all: [firstUserId, secondUserId] },
    $expr: { $eq: [{ $size: '$participants' }, 2] },
  })
    .populate(conversationPopulate)
    .lean();

const createConversation = async (participants) => Conversation.create({ participants });

const getConversationById = async (conversationId) =>
  Conversation.findById(conversationId).populate(conversationPopulate).lean();

const getMessagesByConversationId = async (conversationId) =>
  Message.find({ conversationId })
    .populate(messagePopulate)
    .sort({ createdAt: 1 })
    .lean();

const createMessage = async (payload) => Message.create(payload);

const updateConversationLastMessage = async (conversationId, lastMessageId) =>
  Conversation.findByIdAndUpdate(
    conversationId,
    { lastMessageId },
    { new: true }
  )
    .populate(conversationPopulate)
    .lean();

module.exports = {
  getConversationsByUserId,
  findConversationBetweenUsers,
  createConversation,
  getConversationById,
  getMessagesByConversationId,
  createMessage,
  updateConversationLastMessage,
};
