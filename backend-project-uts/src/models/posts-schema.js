module.exports = (db) =>
  db.model(
    'Posts',
    db.Schema(
      {
        caption: {
          type: String,
          required: true,
        },
        media: {
          type: String,
        },
        userId: {
          type: db.Schema.Types.ObjectId,
          ref: 'Users',
        },
      },
      {
        timestamps: true,
      }
    )
  );
