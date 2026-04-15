const asyncHandler = require('../../../utils/async-handler');
const { requireAuthenticatedUser } = require('../../../utils/validators');
const conversationService = require('../conversation/conversation-service');

const createMessage = asyncHandler(async (request, response) => {
  const result = await conversationService.createMessage({
    conversationId: request.body.conversationId,
    currentUserId: requireAuthenticatedUser(request),
    receiverId: request.body.receiverId,
    content: request.body.content,
  });

  response.status(201).json(result);
});

module.exports = {
  createMessage,
};
