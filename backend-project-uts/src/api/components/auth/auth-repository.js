const db = require('../../../models');

const { User } = db;

const createUser = async (payload) => User.create(payload);

const getUserByEmail = async (email) => User.findOne({ email }).lean();

const getUserById = async (userId) => User.findById(userId).lean();

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
};
