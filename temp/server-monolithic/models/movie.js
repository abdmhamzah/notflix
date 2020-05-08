const { getDatabase } = require("../config/mongo");
const { ObjectId } = require("mongodb");
const db = getDatabase();
const movie = db.collection("Movies");

class Movie {
  static find() {
    return movie.find().toArray();
  }
  static findById(id) {
    return movie.findOne({ _id: ObjectId(id) });
  }
  static create(newMovie) {
    return movie.insertOne(newMovie);
  }
  static update(id, updatedMovieData) {
    movie.updateOne({ _id: ObjectId(id) }, { $set: updatedMovieData });
    return movie.findOne({ _id: ObjectId(id) });
  }
  static destroy(id) {
    return movie.deleteOne({ _id: ObjectId(id) });
  }
}

module.exports = Movie;
