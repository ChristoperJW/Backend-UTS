module.exports = (db) =>
  db.model(
    'Conversation',
    db.Schema(
      {
        participants: [
          {
            type: db.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
          },
        ],
        lastMessageId: {
          type: db.Schema.Types.ObjectId,
          ref: 'Message',
          default: null,
        },
      },
      { timestamps: true }
    )
  );
