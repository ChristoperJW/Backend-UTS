const db = require('../../models');
const config = require('../../core/config');
const { errorResponder, errorTypes } = require('../../core/errors');
const { verifyToken } = require('../../utils/jwt');

const { User } = db;

module.exports = async (request, response, next) => {
  try {
    const authorization = request.headers.authorization || '';

    if (!authorization.startsWith('Bearer ')) {
      return next(
        errorResponder(
          errorTypes.NO_ANONYMOUS_ACCESS,
          'Authorization header with Bearer token is required'
        )
      );
    }

    const token = authorization.slice(7);
    const payload = verifyToken(token, config.jwt.secret);
    const user = await User.findById(payload.userId).lean();

    if (!user) {
      return next(errorResponder(errorTypes.NO_ANONYMOUS_ACCESS, 'User not found'));
    }

    request.user = user;

    return next();
  } catch (error) {
    if (error.message === 'Token expired') {
      return next(errorResponder(errorTypes.TOKEN_EXPIRED, 'Token expired'));
    }

    return next(
      errorResponder(errorTypes.TOKEN_VERIFY, error.message || 'Invalid token')
    );
  }
};
