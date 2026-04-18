module.exports = (db) =>
  db.model(
    'Messages',
    db.Schema({
      senderId: String,
      receiverId: String,
      content: String,
      timestamp: { type: Date, default: Date.now },
    })
  );
