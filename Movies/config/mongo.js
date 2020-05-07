const { MongoClient } = require("mongodb");
const url = "mongodb://localhost:27017";
const dbName = "movie-service-db";
const client = new MongoClient(url, { useUnifiedTopology: true });

let db;

function connect(callback) {
  client.connect(function (err) {
    if (err) {
      console.log("Connection to Mongo Failed", err);
    } else {
      db = client.db(dbName);
    }
    callback(err);
  });
}

function getDatabase() {
  return db;
}

module.exports = {
  connect,
  getDatabase,
};
