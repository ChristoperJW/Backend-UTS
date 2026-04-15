module.exports = (db) =>
  db.model(
    'Comment',
    db.Schema(
      {
        postId: {
          type: db.Schema.Types.ObjectId,
          ref: 'Post',
          required: true,
        },
        userId: {
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
