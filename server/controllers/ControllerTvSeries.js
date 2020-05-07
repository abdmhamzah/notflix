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

  static getTvSerie(req, res) {
    const { id } = req.params;
    TvSerie.findById(id)
      .then((tvSerie) => {
        res.status(200).json(tvSerie);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }

  static createTvSerie(req, res) {
    const { popularity, tags } = req.body;
    let newTvSerie = {
      ...req.body,
      popularity: Number(popularity),
      tags: tags.split(","),
    };
    TvSerie.create(newTvSerie)
      .then((movie) => {
        res.status(200).json(movie.ops[0]);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }

  static updateTvSerie(req, res) {
    const { id } = req.params;
    const { popularity, tags } = req.body;
    let newPopularity = Number(popularity);
    let newTags = tags.split(",");
    let updatedTvSerieData = {
      ...req.body,
      popularity: newPopularity,
      tags: newTags,
    };
    TvSerie.update(id, updatedTvSerieData)
      .then((updatedTvSerie) => {
        res.status(200).json(updatedTvSerie);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }

  static deldeteTvSerie(req, res) {
    const { id } = req.params;
    TvSerie.destroy(id)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
}

module.exports = ControllerTvSeries;
