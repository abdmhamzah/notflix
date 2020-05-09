const axios = require("axios");
const url = "http://localhost:3003/tv";
const Redis = require("ioredis");
const redis = new Redis();

class ControllerTvSeries {
  static async getTvSeries(req, res) {
    try {
      const tvSeries = JSON.parse(await redis.get("tvSeries"));
      if (tvSeries) {
        res.status(200).json(tvSeries);
      } else {
        const { data } = await axios({
          url: url,
          method: "GET",
        });
        res.status(200).json(data);
        redis.set("tvSeries", JSON.stringify(data));
      }
    } catch (error) {
      res.send(error);
    }
  }

  static async getTvSerie(req, res) {
    try {
      const { id } = req.params;
      const tvSerie = JSON.parse(await redis.get("tvSerie"));
      if (tvSerie._id === id) {
        res.status(200).json(tvSerie);
      } else {
        const { data } = await axios({
          url: `${url}/${id}`,
          method: "GET",
        });
        res.status(200).json(data);
        redis.set("tvSerie", JSON.stringify(data));
      }
    } catch (error) {
      res.send(error);
    }
  }

  static async createTvSerie(req, res) {
    try {
      const { data } = await axios({
        url: url,
        method: "POST",
        data: req.body,
      });
      res.status(201).json(data);
      const tvSeries = JSON.parse(await redis.get("tvSeries"));
      if (tvSeries) {
        tvSeries.push(data);
        redis.set("tvSeries", JSON.stringify(tvSeries));
      }
    } catch (error) {
      res.send(error);
    }
  }

  static async updateTvSerie(req, res) {
    try {
      const { id } = req.params;
      const { data } = await axios({
        url: `${url}/${id}`,
        method: "PUT",
        data: req.body,
      });
      res.status(200).json(data);
      const tvSeries = JSON.parse(await redis.get("tvSeries"));
      if (tvSeries) {
        let newTvSeries = [];
        tvSeries.forEach((tvSerie) => {
          if (tvSerie._id === id) tvSerie = data;
          newtvSeries.push(tvSerie);
        });
        redis.set("tvSeries", JSON.stringify(newTvSeries));
      }
    } catch (error) {
      res.send(error);
    }
  }

  static async deleteTvSerie(req, res) {
    try {
      const { id } = req.params;
      const { data } = await axios({
        url: `${url}/${id}`,
        method: "DELETE",
      });
      res.status(200).json(data);
      const tvSeries = JSON.parse(await redis.get("tvSeries"));
      if (tvSeries) {
        let undeleted = tvSeries.filter((tvSerie) => tvSerie._id !== id);
        redis.set("tvSeries", JSON.stringify(undeleted));
      }
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = ControllerTvSeries;
