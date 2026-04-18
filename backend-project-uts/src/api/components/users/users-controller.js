/* eslint-disable prettier/prettier */
/* eslint-disable prefer-destructuring */
const usersService = require('./users-service');
const { errorResponder, errorTypes } = require('../../../core/errors');
const { hashPassword, passwordMatched } = require('../../../utils/password');

async function getUsers(req, res, next) {
  try {
    const searchKeyword = req.query.search || '';

    const users = await usersService.searchUsers(searchKeyword);
    return res.status(200).json(users);
  } catch (err) {
    return next(err);
  }
}

async function getUser(req, res, next) {
  try {
    const user = await usersService.getUser(req.params.id);

    if (!user) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'User not found');
    }

    return res.status(200).json(user);
  } catch (err) {
    return next(err);
  }
}

async function updateUser(req, res, next) {
  try {
    const { email, full_name: fullName } = req.body;

    const user = await usersService.getUser(req.params.id);
    if (!user) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'User not found');
    }

    await usersService.updateUser(req.params.id, email, fullName);

    return res.status(200).json({ message: 'Updated successfully' });
  } catch (err) {
    return next(err);
  }
}

async function changePassword(req, res, next) {
  try {
    const user = await usersService.getUser(req.params.id);

    const {
      old_password: oldPassword,
      new_password: newPassword,
      confirm_new_password: confirmNewPassword,
    } = req.body;

    if (!user) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'User not found');
    }

    if (req.user.id !== req.params.id) {
      throw errorResponder(errorTypes.FORBIDDEN, 'Unauthorized');
    }

    if (!(await passwordMatched(oldPassword, user.password))) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Wrong password');
    }

    if (newPassword.length < 8) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Min 8 chars');
    }

    if (newPassword !== confirmNewPassword) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Not match');
    }

    if (oldPassword === newPassword) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Same as old password');
    }

    const hashed = await hashPassword(newPassword);

    await usersService.changePassword(user.id, hashed);

    return res.json({ message: 'Password updated' });
  } catch (err) {
    return next(err);
  }
}

async function followUser(req, res, next) {
  try {
    await usersService.followUser(req.user.id, req.params.id);
    res.json({ message: 'Followed' });
  } catch (err) {
    next(err);
  }
}

async function unfollowUser(req, res, next) {
  try {
    await usersService.unfollowUser(req.user.id, req.params.id);
    res.json({ message: 'Unfollowed' });
  } catch (err) {
    next(err);
  }
}

async function getFollowers(req, res, next) {
  try {
    const data = await usersService.getFollowers(req.params.id);
    res.json(data);
  } catch (err) {
    next(err);
  }
}

async function getFollowing(req, res, next) {
  try {
    const data = await usersService.getFollowing(req.params.id);
    res.json(data);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getUsers,
  getUser,
  updateUser,
  changePassword,
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
};
