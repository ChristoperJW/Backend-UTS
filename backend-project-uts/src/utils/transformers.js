const toPublicUser = (user) => {
  if (!user) {
    return null;
  }

  const { _id: id, followers, following, ...rest } = user;

  return {
    id,
    ...rest,
    followersCount: Array.isArray(followers) ? followers.length : undefined,
    followingCount: Array.isArray(following) ? following.length : undefined,
  };
};

const toPostResponse = (post) => {
  const { _id: id, userId, likes, ...rest } = post;

  return {
    id,
    ...rest,
    author: userId && userId._id ? toPublicUser(userId) : userId,
    likesCount: Array.isArray(likes) ? likes.length : 0,
    likes: likes || [],
  };
};

const toCommentResponse = (comment) => {
  const { _id: id, userId, ...rest } = comment;

  return {
    id,
    ...rest,
    author: userId && userId._id ? toPublicUser(userId) : userId,
  };
};

const toMessageResponse = (message) => {
  const { _id: id, conversationId, senderId, receiverId, ...rest } = message;

  return {
    id,
    ...rest,
    conversationId:
      conversationId && conversationId._id ? conversationId._id : conversationId,
    sender: senderId && senderId._id ? toPublicUser(senderId) : senderId,
    receiver: receiverId && receiverId._id ? toPublicUser(receiverId) : receiverId,
  };
};

const toConversationResponse = (conversation) => {
  const { _id: id, participants, lastMessageId, ...rest } = conversation;

  return {
    id,
    ...rest,
    participants: Array.isArray(participants)
      ? participants.map((participant) =>
          participant && participant._id
            ? toPublicUser(participant)
            : participant
        )
      : [],
    lastMessage:
      lastMessageId && lastMessageId._id
        ? toMessageResponse(lastMessageId)
        : lastMessageId,
  };
};

module.exports = {
  toPublicUser,
  toPostResponse,
  toCommentResponse,
  toMessageResponse,
  toConversationResponse,
};
