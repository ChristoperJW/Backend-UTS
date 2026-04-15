module.exports = (db) =>
  db.model(
    'Post',
    db.Schema(
      {
        userId: { type: db.Schema.Types.ObjectId, ref: 'User', required: true },
        caption: {
          type: String,
          default: '',
        },
        mediaUrl: {
          type: String,
          default: '',
        },
        mediaType: {
          type: String,
          enum: ['image', 'video', ''],
          default: '',
        },
        likes: [{ type: db.Schema.Types.ObjectId, ref: 'User' }],
      },
      { timestamps: true }
    )
  );
