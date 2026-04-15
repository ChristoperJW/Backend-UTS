module.exports = (db) =>
  db.model(
    'User',
    db.Schema(
      {
        email: {
          type: String,
          required: true,
          unique: true,
          lowercase: true,
          trim: true,
        },
        password: {
          type: String,
          required: true,
        },
        fullName: {
          type: String,
          required: true,
          trim: true,
        },
        bio: {
          type: String,
          default: '',
        },
        avatar: {
          type: String,
          default: '',
        },
        followers: [{ type: db.Schema.Types.ObjectId, ref: 'User', default: [] }],
        following: [{ type: db.Schema.Types.ObjectId, ref: 'User', default: [] }],
      },
      { timestamps: true }
    )
  );
