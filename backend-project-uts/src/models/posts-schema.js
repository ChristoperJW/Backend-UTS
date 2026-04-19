module.exports = (db) =>
  db.model(
    'Posts',
    db.Schema(
      {
        username: {
          type: String,
          required: true,
        },
        post: {
          type: String,
          required: true,
        },
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
