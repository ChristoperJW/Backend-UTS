module.exports = (db) =>
  db.model(
    'Posts',
    db.Schema(
      {
        userId: {
          type: db.Schema.Types.ObjectId,
          ref: 'Users',
        },
        caption: {
          type: String,
          required: true,
        },
        media: {
          type: String,
        },
      },
      {
        timestamps: true,
      }
    )
  );
