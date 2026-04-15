const asyncHandler = require('../../../utils/async-handler');
const authService = require('./auth-service');

const register = asyncHandler(async (request, response) => {
  const result = await authService.register({
    email: request.body.email,
    password: request.body.password,
    fullName: request.body.fullName || request.body.nama,
  });

  response.status(201).json(result);
});

const login = asyncHandler(async (request, response) => {
  const result = await authService.login({
    email: request.body.email,
    password: request.body.password,
  });

  response.status(200).json(result);
});

const me = asyncHandler(async (request, response) => {
  const { _id: currentUserId } = request.user;
  const result = await authService.me(currentUserId.toString());

  response.status(200).json(result);
});

module.exports = {
  register,
  login,
  me,
};
