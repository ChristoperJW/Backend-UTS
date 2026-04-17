module.exports = (db) =>
  db.model(
    'Posts',
    db.Schema({
      username: String,
      post: String,
      caption: String,
    })
  );
