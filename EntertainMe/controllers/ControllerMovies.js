const axios = require("axios");
const url = "http://localhost:3001/movies";

class ControllerMovies {
  static getMovies(req, res) {
    axios({
      url: url,
      method: "GET",
    })
      .then(({ data }) => {
        res.status(200).json(data);
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
      .then(({ data }) => {
        res.status(200).json(data);
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
      .then(({ data }) => {
        res.status(201).json(data);
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
      .then(({ data }) => {
        res.status(200).json(data);
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
      .then(({ data }) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }
}

module.exports = ControllerMovies;
