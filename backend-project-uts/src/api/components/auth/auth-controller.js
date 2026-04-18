const authService = require('./auth-service');
const usersService = require('../users/users-service');
const { hashPassword, passwordMatched } = require('../../../utils/password');
const { generateToken } = require('../../../utils/jwt');
const { errorResponder, errorTypes } = require('../../../core/errors');

// ✅ REGISTER
async function register(req, res, next) {
  try {
    const {
      email,
      password,
      confirm_password: confirmPassword,
      full_name: fullName,
    } = req.body;

    if (!email) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Email required');
    }

    if (!fullName) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Full name required');
    }

    if (await usersService.emailExists(email)) {
      throw errorResponder(errorTypes.EMAIL_ALREADY_TAKEN, 'Email exists');
    }

    if (password.length < 8) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Min 8 chars');
    }

    if (password !== confirmPassword) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Password not match');
    }

    const hashed = await hashPassword(password);

    await authService.register(email, hashed, fullName);

    return res.status(201).json({ message: 'Register success' });
  } catch (err) {
    return next(err);
  }
}

// ✅ LOGIN
async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await authService.getUserByEmail(email);

    if (!user || !(await passwordMatched(password, user.password))) {
      throw errorResponder(errorTypes.UNAUTHORIZED, 'Invalid credentials');
    }

    const token = generateToken({ id: user.id });

    return res.status(200).json({ token });
  } catch (err) {
    return next(err);
  }
}

// ✅ GET ME
async function me(req, res, next) {
  try {
    const user = await authService.getUser(req.user.id);

    return res.status(200).json(user);
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  register,
  login,
  me,
};
