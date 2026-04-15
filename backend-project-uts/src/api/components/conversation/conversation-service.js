const db = require('../../../models');
const { errorResponder, errorTypes } = require('../../../core/errors');
const {
  toConversationResponse,
  toMessageResponse,
} = require('../../../utils/transformers');
const {
  validateObjectId,
  requireString,
} = require('../../../utils/validators');
const conversationRepository = require('./conversation-repository');

const { User } = db;

const ensureUserExists = async (userId) => {
  const user = await User.findById(userId).lean();

  if (!user) {
    throw errorResponder(errorTypes.NOT_FOUND, 'User not found');
  }

  return user;
};

const ensureConversationExists = async (conversationId) => {
  const conversation = await conversationRepository.getConversationById(conversationId);

  if (!conversation) {
    throw errorResponder(errorTypes.NOT_FOUND, 'Conversation not found');
  }

  return conversation;
};

const assertParticipant = (conversation, currentUserId) => {
  const isParticipant = conversation.participants.some(
    (participant) => participant._id.toString() === currentUserId
  );

  if (!isParticipant) {
    throw errorResponder(
      errorTypes.FORBIDDEN,
      'You are not a participant in this conversation'
    );
  }
};

const getConversations = async (currentUserId) => {
  const conversations = await conversationRepository.getConversationsByUserId(currentUserId);

  return {
    message: 'Conversations fetched successfully',
    data: conversations.map(toConversationResponse),
  };
};

const createConversation = async ({ currentUserId, participantId }) => {
  validateObjectId(participantId, 'participantId');

  if (currentUserId === participantId) {
    throw errorResponder(
      errorTypes.BAD_REQUEST,
      'You cannot create a conversation with yourself'
    );
  }

  await ensureUserExists(currentUserId);
  await ensureUserExists(participantId);

  const existingConversation = await conversationRepository.findConversationBetweenUsers(
    currentUserId,
    participantId
  );

  if (existingConversation) {
    return {
      message: 'Conversation already exists',
      data: toConversationResponse(existingConversation),
    };
  }

  const conversation = await conversationRepository.createConversation([
    currentUserId,
    participantId,
  ]);

  const createdConversation = await conversationRepository.getConversationById(
    conversation._id.toString()
  );

  return {
    message: 'Conversation created successfully',
    data: toConversationResponse(createdConversation),
  };
};

const getMessages = async ({ conversationId, currentUserId }) => {
  validateObjectId(conversationId, 'Conversation id');

  const conversation = await ensureConversationExists(conversationId);
  assertParticipant(conversation, currentUserId);

  const messages = await conversationRepository.getMessagesByConversationId(conversationId);

  return {
    message: 'Messages fetched successfully',
    data: messages.map(toMessageResponse),
  };
};

const createMessage = async ({
  conversationId,
  currentUserId,
  receiverId,
  content,
}) => {
  validateObjectId(conversationId, 'conversationId');
  validateObjectId(receiverId, 'receiverId');
  requireString(content, 'content');

  const conversation = await ensureConversationExists(conversationId);
  assertParticipant(conversation, currentUserId);

  const isReceiverParticipant = conversation.participants.some(
    (participant) => participant._id.toString() === receiverId
  );

  if (!isReceiverParticipant) {
    throw errorResponder(
      errorTypes.BAD_REQUEST,
      'Receiver must be a participant in the conversation'
    );
  }

  const message = await conversationRepository.createMessage({
    conversationId,
    senderId: currentUserId,
    receiverId,
    content: content.trim(),
  });

  await conversationRepository.updateConversationLastMessage(
    conversationId,
    message._id.toString()
  );

  const messages = await conversationRepository.getMessagesByConversationId(conversationId);
  const createdMessage = messages.find(
    (item) => item._id.toString() === message._id.toString()
  );

  return {
    message: 'Message sent successfully',
    data: toMessageResponse(createdMessage),
  };
};

module.exports = {
  getConversations,
  createConversation,
  getMessages,
  createMessage,
};
