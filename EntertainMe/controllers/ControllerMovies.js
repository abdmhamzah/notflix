const axios = require("axios");
const url = "http://localhost:3001/movies";

class ControllerMovies {
  static getMovies(req, res) {
    axios({
      url: url,
      method: "GET",
    })
      .then(({ result }) => {
        console.log(result, "<<< masuk pakekoo");
        res.status(200).json(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }

  static getMovie(req, res) {
    const { id } = req.params;
    axios({
      url: `${url}/${id}`,
      method: "GET",
    })
      .then(({ movie }) => {
        res.status(200).json(movie);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }

  static createMovie(req, res) {
    axios({
      url: url,
      method: "POST",
      data: req.body,
    })
      .then(({ newMovie }) => {
        res.status(201).json(newMovie);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }

  static updateMovie(req, res) {
    const { id } = req.params;
    axios({
      url: `${url}/${id}`,
      method: "PUT",
      data: req.body,
    })
      .then(({ updatedMovie }) => {
        res.status(200).json(updatedMovie);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }

  static deleteMovie(req, res) {
    const { id } = req.params;
    axios({
      url: `${url}/${id}`,
      method: "DELETE",
    })
      .then(({ result }) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }
}

module.exports = ControllerMovies;
