const axios = require("axios");
const urlMovies = "http://localhost:3002/movies";
const urlTvSeries = "http://localhost:3003/tv";
const Redis = require("ioredis");
const redis = new Redis();

class ControllerEntertainMe {
  static async findAll(req, res) {
    try {
      const movies = JSON.parse(await redis.get("movies"));
      const tvSeries = JSON.parse(await redis.get("tvSeries"));
      const movieTv = {};
      if (!movies) {
        const { data } = await axios({
          url: urlMovies,
          method: "GET",
        });
        movieTv.movies = data;
        redis.set("movies", JSON.stringify(data));
      } else {
        movieTv.movies = movies;
      }
      if (!tvSeries) {
        const { data } = await axios({
          url: urlTvSeries,
          method: "GET",
        });
        movieTv.tvSeries = data;
        redis.set("tvSeries", JSON.stringify(data));
      } else {
        movieTv.tvSeries = tvSeries;
      }
      res.status(200).json(movieTv);
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = ControllerEntertainMe;
