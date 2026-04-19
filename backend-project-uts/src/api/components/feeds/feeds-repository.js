const { Posts, Feeds } = require('../../../models');

async function getAllFeeds() {
  const randomPosts = await Posts.aggregate([{ $sample: { size: 3 } }]);

  await Feeds.deleteMany({});
  await Feeds.insertMany(randomPosts);

  return randomPosts;
}

module.exports = {
  getAllFeeds,
};
