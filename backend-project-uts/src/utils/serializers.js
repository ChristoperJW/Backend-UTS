const toPublicUser = (user) => {
  if (!user) {
    return null;
  }

  return {
    id: user._id,
    email: user.email,
    fullName: user.fullName,
    bio: user.bio,
    avatar: user.avatar,
    followersCount: user.followers ? user.followers.length : undefined,
    followingCount: user.following ? user.following.length : undefined,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

const toPostResponse = (post) => ({
  id: post._id,
  caption: post.caption,
  mediaUrl: post.mediaUrl,
  mediaType: post.mediaType,
  author: post.userId && post.userId._id ? toPublicUser(post.userId) : post.userId,
  likesCount: post.likes ? post.likes.length : 0,
  likes: post.likes || [],
  createdAt: post.createdAt,
  updatedAt: post.updatedAt,
});

const toCommentResponse = (comment) => ({
  id: comment._id,
  content: comment.content,
  postId: comment.postId,
  author:
    comment.userId && comment.userId._id ? toPublicUser(comment.userId) : comment.userId,
  createdAt: comment.createdAt,
  updatedAt: comment.updatedAt,
});

const toMessageResponse = (message) => ({
  id: message._id,
  conversationId:
    message.conversationId && message.conversationId._id
      ? message.conversationId._id
      : message.conversationId,
  sender:
    message.senderId && message.senderId._id ? toPublicUser(message.senderId) : message.senderId,
  receiver:
    message.receiverId && message.receiverId._id
      ? toPublicUser(message.receiverId)
      : message.receiverId,
  content: message.content,
  createdAt: message.createdAt,
  updatedAt: message.updatedAt,
});

module.exports = {
  toPublicUser,
  toPostResponse,
  toCommentResponse,
  toMessageResponse,
};
