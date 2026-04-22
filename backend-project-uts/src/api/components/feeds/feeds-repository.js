const { Posts, Feeds } = require('../../../models');

async function getAllFeeds() {
  const randomPosts = await Posts.aggregate([{ $sample: { size: 3 } }]);

  await Feeds.deleteMany({});
  await Feeds.insertMany(
    randomPosts.map((post) => ({
      postId: post._id, // eslint-disable-line no-underscore-dangle
    }))
  );

  return Feeds.find().populate('postId');
}

module.exports = {
  getAllFeeds,
};
