module.exports = (db) =>
  db.model(
    'Messages',
    new db.Schema(
      {
        conversationId: {
          type: db.Schema.Types.ObjectId,
          ref: 'Conversations',
          required: true,
        },
        senderId: {
          type: db.Schema.Types.ObjectId,
          ref: 'Users',
          required: true,
        },
        text: {
          type: String,
          required: true,
        },
      },
      {
        timestamps: true,
      }
    )
  );
