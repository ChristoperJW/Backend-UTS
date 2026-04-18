const mongoose = require('mongoose');
const config = require('../core/config');

const databaseUri = `${config.database.connection}/${config.database.name}`;

mongoose.connect(databaseUri);

const db = mongoose.connection;

db.once('open', () => {
  console.log(`Connected to MongoDB: ${databaseUri}`);
});

const Users = require('./users-schema')(mongoose);
const Conversation = require('./conversations-schema')(mongoose);
const Message = require('./messages-schema')(mongoose);

module.exports = {
  Users,
  Conversation,
  Message,
};
