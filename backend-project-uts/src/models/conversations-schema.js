module.exports = (db) =>
  db.model(
    'Conversations',
    new db.Schema(
      {
        participants: [
          {
            type: db.Schema.Types.ObjectId,
            ref: 'Users',
          },
        ],
      },
      {
        timestamps: true,
      }
    )
  );
