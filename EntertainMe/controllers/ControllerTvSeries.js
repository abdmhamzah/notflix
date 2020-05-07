const axios = require("axios");
const url = "http://localhost:3002/tvSeries";

class ControllerTvSeries {
  static getTvSeries(req, res) {
    axios({
      url: url,
      method: "GET",
    })
      .then(({ tvSeries }) => {
        res.status(200).json(tvSeries);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }

  static getTvSerie(req, res) {
    const { id } = req.params;
    axios({
      url: `${url}/${id}`,
      method: "GET",
    })
      .then(({ tvSerie }) => {
        res.status(200).json(tvSerie);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }

  static createTvSerie(req, res) {
    axios({
      url: url,
      method: "POST",
      data: req.body,
    })
      .then(({ newTvSerie }) => {
        res.status(201).json(newTvSerie);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }

  static updateTvSerie(req, res) {
    const { id } = req.params;
    axios({
      url: `${url}/${id}`,
      method: "PUT",
      data: req.body,
    })
      .then(({ updatedTvSerie }) => {
        res.status(200).json(updatedTvSerie);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }

  static deleteTvSerie(req, res) {
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

module.exports = ControllerTvSeries;
