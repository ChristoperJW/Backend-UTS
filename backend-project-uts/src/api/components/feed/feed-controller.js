const asyncHandler = require('../../../utils/async-handler');
const { requireAuthenticatedUser } = require('../../../utils/validators');
const postService = require('../post/post-service');

const getFeed = asyncHandler(async (request, response) => {
  const result = await postService.getFeed(requireAuthenticatedUser(request));

  response.status(200).json(result);
});

module.exports = {
  getFeed,
};
