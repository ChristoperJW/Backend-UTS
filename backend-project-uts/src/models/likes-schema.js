module.exports = (db) =>
  db.model(
    'Likes',
    db.Schema(
      {
        userId: {
          type: db.Schema.Types.ObjectId,
          ref: 'Users',
          required: true,
        },
        postId: {
          type: db.Schema.Types.ObjectId,
          ref: 'Posts',
          required: true,
        },
      },
      {
        timestamps: true,
      }
    )
  );
