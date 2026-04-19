/* eslint-disable prettier/prettier */
module.exports = (db) =>
  db.model(
    'Users',
    new db.Schema(
      {
        name: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
          unique: true,
        },
        password: {
          type: String,
          required: true,
        },
        fullName: {
          type: String,
          required: true,
        },

        followers: [
          {
            type: db.Schema.Types.ObjectId,
            ref: 'Users',
          },
        ],
        following: [
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
