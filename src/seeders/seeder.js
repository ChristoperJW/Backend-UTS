const { mongoose, Posts, Comments } = require('../models');

const posts = [
  {
    username: 'christoper',
    post: 'New year picture',
    caption: 'Happy New Year',
  },
  {
    username: 'louise',
    post: 'citylight',
    caption: 'beautiful city',
  },
  {
    username: 'angga',
    post: 'tennis image',
    caption: 'tennis time',
  },
  {
    username: 'michael',
    post: 'basketball image',
    caption: 'basket time',
  },
  {
    username: 'monica',
    post: 'selfie',
    caption: 'what a nice day',
  },
];

async function seed() {
  await Posts.deleteMany({});
  await Comments.deleteMany({});

  const createdPosts = await Posts.insertMany(posts);

  /* eslint-disable no-underscore-dangle */
  const comments = [
    { postId: createdPosts[0]._id, comment: 'Selamat tahun baru!' },
    { postId: createdPosts[0]._id, comment: 'Wah keren fotonya!' },
    { postId: createdPosts[1]._id, comment: 'Indah banget kotanya' },
    { postId: createdPosts[2]._id, comment: 'Ayo main tennis bareng!' },
  ];

  await Comments.insertMany(comments);
  // eslint-disable-next-line no-console
  console.log('Seeding selesai dan berhasil!');
  mongoose.connection.close();
}

seed();
