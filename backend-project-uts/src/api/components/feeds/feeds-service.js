const feedsRepository = require('./feeds-repository');

async function getAllFeeds() {
  return feedsRepository.getAllFeeds();
}

module.exports = {
  getAllFeeds,
};
