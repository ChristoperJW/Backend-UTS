const mongoose = require('mongoose');

module.exports = (db) =>
  db.model(
    'Conversation',
    new db.Schema({
      participants: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
      ],
      createdAt: {
        type: Date,
        default: Date.now,
      },
      updatedAt: {
        type: Date,
        default: Date.now,
      },
    })
  );
