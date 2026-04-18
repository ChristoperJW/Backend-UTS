const messagesService = require('./messages-service');

async function getConversations(request, response, next) {
  try {
    const { userId } = request.body;
    const conversations = await messagesService.getConversations(userId);
    return response.status(200).json(conversations);
  } catch (error) {
    return next(error);
  }
}

async function createConversation(request, response, next) {
  try {
    const { userId, participantId } = request.body;
    const conversation = await messagesService.createConversation(
      userId,
      participantId
    );
    return response.status(201).json(conversation);
  } catch (error) {
    return next(error);
  }
}

async function getMessagesByConversation(request, response, next) {
  try {
    const conversationId = request.params.id;
    const messages =
      await messagesService.getMessagesByConversation(conversationId);
    return response.status(200).json(messages);
  } catch (error) {
    return next(error);
  }
}

async function sendMessage(request, response, next) {
  try {
    const { conversationId, senderId, content } = request.body;
    const message = await messagesService.sendMessage(
      conversationId,
      senderId,
      content
    );
    return response.status(201).json(message);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getConversations,
  createConversation,
  getMessagesByConversation,
  sendMessage,
};
