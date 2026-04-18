const messagesRepository = require('./messages-repository');

async function getMessages() {
  return messagesRepository.getMessages();
}

async function getMessage(id) {
  return messagesRepository.getMessage(id);
}

async function createMessage(senderId, receiverId, content) {
  return messagesRepository.createMessage(senderId, receiverId, content);
}

async function updateMessage(id, content) {
  return messagesRepository.updateMessage(id, content);
}

async function deleteMessage(id) {
  return messagesRepository.deleteMessage(id);
}

module.exports = {
  getMessages,
  getMessage,
  createMessage,
  updateMessage,
  deleteMessage,
};