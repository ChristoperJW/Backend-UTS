const config = require('../../../core/config');
const { errorResponder, errorTypes } = require('../../../core/errors');
const { hashPassword, passwordMatched } = require('../../../utils/password');
const { toPublicUser } = require('../../../utils/transformers');
const { requireString } = require('../../../utils/validators');
const { signToken } = require('../../../utils/jwt');
const authRepository = require('./auth-repository');

const register = async ({ email, password, fullName }) => {
  const normalizedEmail = requireString(email, 'email').toLowerCase();
  const cleanPassword = requireString(password, 'password');
  const cleanFullName = requireString(fullName, 'fullName');

  const existingUser = await authRepository.getUserByEmail(normalizedEmail);

  if (existingUser) {
    throw errorResponder(errorTypes.EMAIL_ALREADY_TAKEN, 'Email already registered');
  }

  const hashedPassword = await hashPassword(cleanPassword);
  const user = await authRepository.createUser({
    email: normalizedEmail,
    password: hashedPassword,
    fullName: cleanFullName,
  });

  return {
    message: 'Register success',
    data: toPublicUser(user.toObject()),
  };
};

const login = async ({ email, password }) => {
  const normalizedEmail = requireString(email, 'email').toLowerCase();
  const cleanPassword = requireString(password, 'password');

  const user = await authRepository.getUserByEmail(normalizedEmail);

  if (!user) {
    throw errorResponder(errorTypes.INVALID_CREDENTIALS, 'Invalid email or password');
  }

  const isValidPassword = await passwordMatched(cleanPassword, user.password);

  if (!isValidPassword) {
    throw errorResponder(errorTypes.INVALID_CREDENTIALS, 'Invalid email or password');
  }

  const { _id: userId } = user;
  const token = signToken({ userId: userId.toString() }, config.jwt.secret, config.jwt.expiresIn);

  return {
    message: 'Login success',
    data: {
      token,
    },
  };
};

const me = async (currentUserId) => {
  const user = await authRepository.getUserById(currentUserId);

  if (!user) {
    throw errorResponder(errorTypes.NO_ANONYMOUS_ACCESS, 'User not found');
  }

  return {
    message: 'Authenticated user fetched successfully',
    data: toPublicUser(user),
  };
};

module.exports = {
  register,
  login,
  me,
};
