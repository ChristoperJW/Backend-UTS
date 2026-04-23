/* eslint-disable no-underscore-dangle */
/* eslint-disable prettier/prettier */
const {
  Conversations,
  Likes,
  Messages,
  Posts,
  Users,
  Comments,
} = require('./models');
const { hashPassword } = require('./utils/password');

const seedDatabase = async () => {
  try {
    console.log('Resetting and seeding the database...');

    await Promise.all([
      Conversations.deleteMany({}), // Ubah jadi Conversations
      Likes.deleteMany({}),
      Messages.deleteMany({}), // Ubah jadi Messages
      Posts.deleteMany({}),
      Users.deleteMany({}),
      Comments.deleteMany({}),
    ]);

    const createdUsers = await Users.insertMany([
      {
        email: 'Angga123@gmail.com',
        password: await hashPassword('angga1234'),
        fullName: 'Angga Johanes Thesman',
      },
      {
        email: 'CJW2233@gmail.com',
        password: await hashPassword('cjwanakBaikBaik123'),
        fullName: 'Christoper Julian Wijaya',
      },
      {
        email: 'LouiseWilliam@gmail.com',
        password: await hashPassword('Louise1234'),
        fullName: 'Louise William',
      },
      {
        email: 'MichaelRSH@gmail.com',
        password: await hashPassword('Michael1234'),
        fullName: 'Michael Respati Sanjaya Ho',
      },
      {
        email: 'MonicaIrene@gmail.com',
        password: await hashPassword('Monica123'),
        fullName: 'Monica Irene',
      },
    ]);

    const createdPosts = await Posts.insertMany([
      {
        userId: createdUsers[1]._id,
        media: 'New year picture',
        caption: 'Happy New Year',
      },
      {
        userId: createdUsers[2]._id,
        media: 'citylight',
        caption: 'beautiful city',
      },
      {
        userId: createdUsers[0]._id,
        media: 'tennis image',
        caption: 'tennis time',
      },
      {
        userId: createdUsers[3]._id,
        media: 'basketball image',
        caption: 'basket time',
      },
      {
        userId: createdUsers[4]._id,
        media: 'selfie',
        caption: 'what a nice day',
      },
    ]);

    await Comments.insertMany([
      { postId: createdPosts[0]._id, comment: 'Selamat tahun baru!' },
      { postId: createdPosts[0]._id, comment: 'Wah keren fotonya!' },
      { postId: createdPosts[1]._id, comment: 'Indah banget kotanya' },
      { postId: createdPosts[2]._id, comment: 'Ayo main tennis bareng!' },
      { postId: createdPosts[3]._id, comment: 'Seru banget nih!' },
    ]);

    // Ubah jadi Conversations
    const createdConversations = await Conversations.insertMany([
      { participants: [createdUsers[0]._id, createdUsers[1]._id] },
      { participants: [createdUsers[1]._id, createdUsers[2]._id] },
      { participants: [createdUsers[2]._id, createdUsers[3]._id] },
      { participants: [createdUsers[3]._id, createdUsers[4]._id] },
      { participants: [createdUsers[4]._id, createdUsers[0]._id] },
    ]);

    // Ubah jadi Messages
    await Messages.insertMany([
      {
        conversationId: createdConversations[0]._id,
        senderId: createdUsers[0]._id,
        text: 'Hi Christopher!',
      },
      {
        conversationId: createdConversations[0]._id,
        senderId: createdUsers[1]._id,
        text: 'Hello Michael!',
      },
      {
        conversationId: createdConversations[1]._id,
        senderId: createdUsers[1]._id,
        text: 'Hey Angga!',
      },
      {
        conversationId: createdConversations[1]._id,
        senderId: createdUsers[2]._id,
        text: 'Hi Louise!',
      },
      {
        conversationId: createdConversations[2]._id,
        senderId: createdUsers[2]._id,
        text: 'Hello Monica!',
      },
    ]);

    await Likes.insertMany([
      { userId: createdUsers[0]._id, postId: createdPosts[1]._id },
      { userId: createdUsers[1]._id, postId: createdPosts[0]._id },
      { userId: createdUsers[2]._id, postId: createdPosts[3]._id },
      { userId: createdUsers[3]._id, postId: createdPosts[2]._id },
      { userId: createdUsers[4]._id, postId: createdPosts[4]._id },
    ]);

    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error occurred while seeding:', error);
  }
};

module.exports = seedDatabase;
