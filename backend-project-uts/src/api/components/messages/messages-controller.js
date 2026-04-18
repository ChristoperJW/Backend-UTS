const messagesService = require('./messages-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function getMessages(request, response, next) {
  try {
    const messages = await messagesService.getMessages();

    return response.status(200).json(messages);
  } catch (error) {
    return next(error);
  }
}

async function getMessage(request, response, next) {
  try {
    const message = await messagesService.getMessage(request.params.id);

    if (!message) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Message not found');
    }

    return response.status(200).json(message);
  } catch (error) {
    return next(error);
  }
}

async function createMessage(request, response, next) {
  try {
    const { senderId, receiverId, content } = request.body;

    if (!senderId) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Sender ID is required');
    }

    if (!receiverId) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Receiver ID is required');
    }

    if (!content) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Content is required');
    }

    const message = await messagesService.createMessage(senderId, receiverId, content);

    return response.status(201).json(message);
  } catch (error) {
    return next(error);
  }
}

async function updateMessage(request, response, next) {
  try {
    const { content } = request.body;

    // Message must exist
    const message = await messagesService.getMessage(request.params.id);
    if (!message) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Message not found');
    }

    if (!content) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Content is required');
    }

    const success = await messagesService.updateMessage(request.params.id, content);

    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to update message'
      );
    }

    return response.status(200).json({ message: 'Message updated successfully' });
  } catch (error) {
    return next(error);
  }
}

async function deleteMessage(request, response, next) {
  try {
    const success = await messagesService.deleteMessage(request.params.id);

    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to delete message'
      );
    }

    return response.status(200).json({ message: 'Message deleted successfully' });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getMessages,
  getMessage,
  createMessage,
  updateMessage,
  deleteMessage,
};