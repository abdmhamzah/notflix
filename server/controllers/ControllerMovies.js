const Movie = require("../models/movie");

class ControllerMovie {
  static getMovies(req, res) {
    Movie.find()
      .then((movies) => {
        res.status(200).json(movies);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }

  static getMovie(req, res) {
    const { id } = req.params;
    Movie.findById(id)
      .then((movie) => {
        res.status(200).json(movie);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }

  static createMovies(req, res) {
    const { popularity, tags } = req.body;
    const newMovie = {
      ...req.body,
      popularity: Number(popularity),
      tags: tags.split(","),
    };
    Movie.create(newMovie)
      .then((movie) => {
        res.status(200).json(movie.ops[0]);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }

  static updateMovies(req, res) {
    const { id } = req.params;
    const { popularity, tags } = req.body;
    const updatedMovieData = {
      ...req.body,
      popularity: Number(popularity),
      tags: tags.split(","),
    };
    Movie.update(id, updatedMovieData)
      .then((updatedMovie) => {
        res.status(200).json(updatedMovie);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }

  static deleteMovies(req, res) {
    const { id } = req.params;
    Movie.destroy(id)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
}

module.exports = ControllerMovie;
