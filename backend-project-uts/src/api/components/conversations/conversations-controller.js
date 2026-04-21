const conversationsService = require('./conversations-service');

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

async function deleteMessage(req, res) {
  try {
    const { messageId } = req.params;
    const userId = req.user.id;

    await conversationsService.removeMessage(messageId, userId);

    res.status(200).json({
      statusCode: 200,
      message: 'Pesan berhasil dihapus',
    });
  } catch (error) {
    res.status(400).json({
      statusCode: 400,
      message: error.message,
    });
  }
}

async function deleteConversation(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    await conversationsService.removeFullConversation(id, userId);

    res.status(200).json({
      statusCode: 200,
      message: 'Seluruh percakapan dan pesan terkait berhasil dihapus',
    });
  } catch (error) {
    res.status(400).json({
      statusCode: 400,
      message: error.message,
    });
  }
}

module.exports = {
  createConversation,
  getMessages,
  sendMessage,
  deleteMessage,
  deleteConversation,
};
