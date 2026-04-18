const usersRepository = require('./users-repository');

async function getUsers() {
  return usersRepository.getUsers();
}

async function getUser(id) {
  return usersRepository.getUser(id);
}

async function getUserByEmail(email) {
  return usersRepository.getUserByEmail(email);
}

async function emailExists(email) {
  const user = await getUserByEmail(email);
  return !!user;
}

async function createUser(email, password, fullName) {
  return usersRepository.createUser(email, password, fullName);
}

async function updateUser(id, email, fullName) {
  return usersRepository.updateUser(id, email, fullName);
}

async function deleteUser(id) {
  return usersRepository.deleteUser(id);
}

async function changePassword(id, hashedPassword) {
  return usersRepository.changePassword(id, hashedPassword);
}

async function searchUsers(query) {
  const { search = '' } = query;
  const users = await getUsers();

  return users.filter((user) =>
    user.fullName.toLowerCase().includes(search.toLowerCase())
  );
}

async function followUser(userId, targetId) {
  const user = await getUser(userId);
  const target = await getUser(targetId);

  if (!user || !target) return false;

  if (!user.following.includes(targetId)) {
    user.following.push(targetId);
    target.followers.push(userId);
  }

  await user.save();
  await target.save();

  return true;
}

async function unfollowUser(userId, targetId) {
  const user = await getUser(userId);
  const target = await getUser(targetId);

  if (!user || !target) return false;

  user.following.pull(targetId);
  target.followers.pull(userId);

  await user.save();
  await target.save();

  return true;
}

async function getFollowers(id) {
  const user = await getUser(id);
  if (!user) return null;

  await user.populate('followers', 'fullName email');
  return user.followers;
}

async function getFollowing(id) {
  const user = await getUser(id);
  if (!user) return null;

  await user.populate('following', 'fullName email');
  return user.following;
}

module.exports = {
  getUsers,
  getUser,
  getUserByEmail,
  emailExists,
  createUser,
  updateUser,
  deleteUser,
  changePassword,
  searchUsers,
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
};
