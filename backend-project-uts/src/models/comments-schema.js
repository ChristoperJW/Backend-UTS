module.exports = (db) =>
  db.model(
    'Comments',
    db.Schema({
      postId: {
        type: db.Schema.Types.ObjectId,
        ref: 'Posts',
        required: true,
      },
      comment: { type: String, required: true },
    })
  );
