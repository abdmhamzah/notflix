const { getDatabase } = require("../config/mongo");
const { ObjectId } = require("mongodb");
const db = getDatabase();
const tvSerie = db.collection("TvSeries");

class TvSerie {
  static find() {
    return tvSerie.find().toArray();
  }
  static findById(id) {
    return tvSerie.findOne({ _id: ObjectId(id) });
  }
  static create(newTvSerie) {
    return tvSerie.insertOne(newTvSerie);
  }
  static update(id, updatedTvSerieData) {
    tvSerie.updateOne({ _id: ObjectId(id) }, { $set: updatedTvSerieData });
    return tvSerie.findOne({ _id: ObjectId(id) });
  }
  static destroy(id) {
    return tvSerie.deleteOne({ _id: ObjectId(id) });
  }
}

module.exports = TvSerie;
