const usersService = require('../users/users-service');

async function register(email, password, fullName) {
  return usersService.createUser(email, password, fullName);
}

async function getUserByEmail(email) {
  return usersService.getUserByEmail(email);
}

async function getUser(id) {
  return usersService.getUser(id);
}

module.exports = {
  register,
  getUserByEmail,
  getUser,
};
