const asyncHandler = require('../../../utils/async-handler');
const { requireAuthenticatedUser } = require('../../../utils/validators');
const conversationService = require('./conversation-service');

const getConversations = asyncHandler(async (request, response) => {
  const result = await conversationService.getConversations(
    requireAuthenticatedUser(request)
  );

  response.status(200).json(result);
});

const createConversation = asyncHandler(async (request, response) => {
  const result = await conversationService.createConversation({
    currentUserId: requireAuthenticatedUser(request),
    participantId: request.body.participantId || request.body.userId,
  });

  response.status(201).json(result);
});

const getMessages = asyncHandler(async (request, response) => {
  const result = await conversationService.getMessages({
    conversationId: request.params.id,
    currentUserId: requireAuthenticatedUser(request),
  });

  response.status(200).json(result);
});

module.exports = {
  getConversations,
  createConversation,
  getMessages,
};
