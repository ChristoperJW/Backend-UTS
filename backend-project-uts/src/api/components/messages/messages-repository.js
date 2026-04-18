const { Messages } = require('../../../models');

async function getMessages() {
  return Messages.find({});
}

async function getMessage(id) {
  return Messages.findById(id);
}

async function createMessage(senderId, receiverId, content) {
  return Messages.create({ senderId, receiverId, content });
}

async function updateMessage(id, content) {
  return Messages.updateOne({ _id: id }, { $set: { content } });
}

async function deleteMessage(id) {
  return Messages.deleteOne({ _id: id });
}

module.exports = {
  getMessages,
  getMessage,
  createMessage,
  updateMessage,
  deleteMessage,
};