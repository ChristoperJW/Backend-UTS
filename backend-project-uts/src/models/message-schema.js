module.exports = (db) =>
  db.model(
    'Message',
    db.Schema(
      {
        conversationId: {
          type: db.Schema.Types.ObjectId,
          ref: 'Conversation',
          required: true,
        },
        senderId: {
          type: db.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        receiverId: {
          type: db.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        content: {
          type: String,
          required: true,
          trim: true,
        },
      },
      { timestamps: true }
    )
  );
