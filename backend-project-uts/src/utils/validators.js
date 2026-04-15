const mongoose = require('mongoose');

const { errorResponder, errorTypes } = require('../core/errors');

const validateObjectId = (value, fieldName) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    throw errorResponder(errorTypes.BAD_REQUEST, `${fieldName} is invalid`);
  }
};

const requireString = (value, fieldName) => {
  if (typeof value !== 'string' || !value.trim()) {
    throw errorResponder(errorTypes.BAD_REQUEST, `${fieldName} is required`);
  }

  return value.trim();
};

const requireAuthenticatedUser = (request) => {
  if (!request.user) {
    throw errorResponder(
      errorTypes.NO_ANONYMOUS_ACCESS,
      'Authentication required. Provide a valid Bearer token'
    );
  }

  const { _id: userId } = request.user;

  return userId.toString();
};

module.exports = {
  validateObjectId,
  requireString,
  requireAuthenticatedUser,
};
