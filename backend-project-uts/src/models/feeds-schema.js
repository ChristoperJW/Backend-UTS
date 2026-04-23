module.exports = (db) =>
  db.model(
    'Feeds',
    db.Schema(
      {
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
