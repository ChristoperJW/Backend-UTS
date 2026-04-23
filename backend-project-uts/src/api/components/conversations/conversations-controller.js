const conversationsService = require('./conversations-service');

async function getUserConversations(request, response, next) {
  try {
    const userId = request.user.id;
    const conversations = await conversationsService.getConversations(userId);

    return response.status(200).json({ statusCode: 200, data: conversations });
  } catch (error) {
    return next(error);
  }
}

async function createConversation(request, response, next) {
  try {
    const senderId = request.user.id;
    const { receiverId } = request.body;
    const conversation = await conversationsService.createConversation(
      senderId,
      receiverId
    );

    return response.status(201).json(conversation);
  } catch (error) {
    return next(error);
  }
}

async function getMessages(request, response, next) {
  try {
    const { id } = request.params;
    const messages = await conversationsService.getMessages(id);

    return response.status(200).json(messages);
  } catch (error) {
    return next(error);
  }
}

async function sendMessage(request, response, next) {
  try {
    const senderId = request.user.id;
    const { conversationId, text } = request.body;
    const newMessage = await conversationsService.sendMessage(
      conversationId,
      senderId,
      text
    );

    return response.status(201).json(newMessage);
  } catch (error) {
    return next(error);
  }
}

async function deleteMessage(request, response, next) {
  try {
    const { messageId } = request.params;
    const userId = request.user.id;
    await conversationsService.removeMessage(messageId, userId);

    return response
      .status(200)
      .json({ statusCode: 200, message: 'Berhasil dihapus' });
  } catch (error) {
    return next(error);
  }
}

async function deleteConversation(request, response, next) {
  try {
    const { id } = request.params;
    const userId = request.user.id;
    await conversationsService.removeFullConversation(id, userId);

    return response
      .status(200)
      .json({ statusCode: 200, message: 'Percakapan dihapus' });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getUserConversations,
  createConversation,
  getMessages,
  sendMessage,
  deleteMessage,
  deleteConversation,
};
