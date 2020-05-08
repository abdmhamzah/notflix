const axios = require("axios");
const url = "http://localhost:3002/tvSeries";

class ControllerTvSeries {
  static getTvSeries(req, res) {
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

  static getTvSerie(req, res) {
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

  static createTvSerie(req, res) {
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

  static updateTvSerie(req, res) {
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
        // console.log(err);
        res.status(500).json(err);
      });
  }

  static deleteTvSerie(req, res) {
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

module.exports = ControllerTvSeries;
