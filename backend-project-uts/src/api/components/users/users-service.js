/* eslint-disable prettier/prettier */
/* eslint-disable no-return-await */
/* eslint-disable prettier/prettier */
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

async function searchUsers(keyword) {
  // 1. Ambil semua user menggunakan fungsi getUsers() yang sudah ada di repo
  const allUsers = await usersRepository.getUsers();

  // 2. Jika tidak ada keyword, langsung kembalikan semua user
  if (!keyword) {
    return allUsers;
  }

  // 3. Sekarang aman untuk memanggil .toLowerCase() karena kita cek keyword dulu
  const cleanKeyword = keyword.toLowerCase().trim();

  // 4. Filter data secara manual di memori Node.js
  return allUsers.filter(
    (user) =>
      user.fullName && user.fullName.toLowerCase().includes(cleanKeyword)
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
