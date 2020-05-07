const { getDatabase } = require("../config/mongo");
const { ObjectId } = require("mongodb");
const db = getDatabase();
const tvSerie = db.collection("TvSeries");

class TvSerie {
  static find() {
    return tvSerie.find().toArray();
  }
}

module.exports = TvSerie;
