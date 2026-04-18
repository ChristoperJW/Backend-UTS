/* eslint-disable no-underscore-dangle */

const { Conversation, Likes, Message, Posts, Users } = require('./models');
const { hashPassword } = require('./utils/password');

const seedDatabase = async () => {
  try {
    console.log('Resetting and seeding the database...');

    await Promise.all([
      Conversation.deleteMany({}),
      Likes.deleteMany({}),
      Message.deleteMany({}),
      Posts.deleteMany({}),
      Users.deleteMany({}),
    ]);

    const createdUsers = await Users.insertMany([
      {
        email: 'Agus123@gmail.com',
        password: await hashPassword('bruh1234'),
        fullName: 'Agus Jabrik',
      },
      {
        email: 'BudiAnakBaik@gmail.com',
        password: await hashPassword('BudiAnakBaikBaik123'),
        fullName: 'Budi Sanjaya',
      },
      {
        email: 'CitraPutri@gmail.com',
        password: await hashPassword('CitraPutri123'),
        fullName: 'Citra Putri',
      },
      {
        email: 'DewiSartika@gmail.com',
        password: await hashPassword('DewiSartika123'),
        fullName: 'Dewi Sartika',
      },
      {
        email: 'EkoPrasetyo@gmail.com',
        password: await hashPassword('EkoPrasetyo123'),
        fullName: 'Eko Prasetyo',
      },
    ]);

    const createdPosts = await Posts.insertMany([
      { caption: 'Hello World!', userId: createdUsers[0]._id },
      { caption: 'My first post!', userId: createdUsers[1]._id },
      { caption: 'Enjoying the day!', userId: createdUsers[2]._id },
      { caption: 'Having fun with friends!', userId: createdUsers[3]._id },
      { caption: 'Life is beautiful!', userId: createdUsers[4]._id },
    ]);

    const createdConversations = await Conversation.insertMany([
      { participants: [createdUsers[0]._id, createdUsers[1]._id] },
      { participants: [createdUsers[1]._id, createdUsers[2]._id] },
      { participants: [createdUsers[2]._id, createdUsers[3]._id] },
      { participants: [createdUsers[3]._id, createdUsers[4]._id] },
      { participants: [createdUsers[4]._id, createdUsers[0]._id] },
    ]);

    await Message.insertMany([
      {
        conversationId: createdConversations[0]._id,
        senderId: createdUsers[0]._id,
        text: 'Hi Budi!',
      },
      {
        conversationId: createdConversations[0]._id,
        senderId: createdUsers[1]._id,
        text: 'Hello Agus!',
      },
      {
        conversationId: createdConversations[1]._id,
        senderId: createdUsers[1]._id,
        text: 'Hey Citra!',
      },
      {
        conversationId: createdConversations[1]._id,
        senderId: createdUsers[2]._id,
        text: 'Hi Budi!',
      },
      {
        conversationId: createdConversations[2]._id,
        senderId: createdUsers[2]._id,
        text: 'Hello Dewi!',
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
