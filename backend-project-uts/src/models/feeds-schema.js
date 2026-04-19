module.exports = (db) =>
  db.model(
    'Feeds',
    db.Schema({
      username: String,
      post: String,
      caption: String,
    })
  );
