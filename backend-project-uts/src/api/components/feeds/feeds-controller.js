const feedsService = require('./feeds-service');

async function getAllFeeds(request, response, next) {
  try {
    const feeds = await feedsService.getAllFeeds(); // tambah ini

    return response.status(200).json(feeds);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getAllFeeds,
};
