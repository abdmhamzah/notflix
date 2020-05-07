const TvSerie = require("../models/tvSerie");

class ControllerTvSeries {
  static getTvSeries(req, res) {
    TvSerie.find()
      .then((tvSeries) => {
        res.status(200).json(tvSeries);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }

  static getTvSerie(req, res) {}

  static createTvSerie(req, res) {}

  static updateTvSerie(req, res) {}

  static deldeteTvSerie(req, res) {}
}

module.exports = ControllerTvSeries;
