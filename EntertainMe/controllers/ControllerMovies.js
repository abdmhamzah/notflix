const axios = require("axios");
const url = "http://localhost:3002/movies";
const Redis = require("ioredis");
const redis = new Redis();

class ControllerMovies {
  static async getMovies(req, res) {
    try {
      const movies = JSON.parse(await redis.get("movies"));
      if (movies) {
        res.status(200).json(movies);
      } else {
        const { data } = await axios({
          url: url,
          method: "GET",
        });
        res.status(200).json(data);
        redis.set("movies", JSON.stringify(data));
      }
    } catch (error) {
      res.send(error);
    }
  }

  static async getMovie(req, res) {
    try {
      const { id } = req.params;
      const movie = JSON.parse(await redis.get("movie"));
      if (movie._id === id) {
        res.status(200).json(movie);
      } else {
        const { data } = await axios({
          url: `${url}/${id}`,
          method: "GET",
        });
        res.status(200).json(data);
        redis.set("movie", JSON.stringify(data));
      }
    } catch (error) {
      res.send(error);
    }
  }

  static async createMovie(req, res) {
    try {
      const { data } = await axios({
        url: url,
        method: "POST",
        data: req.body,
      });
      res.status(201).json(data);
      const movies = JSON.parse(await redis.get("movies"));
      if (movies) {
        movies.push(data);
        redis.set("movies", JSON.stringify(movies));
      }
    } catch (error) {
      res.send(error);
    }
  }

  static async updateMovie(req, res) {
    try {
      const { id } = req.params;
      const { data } = await axios({
        url: `${url}/${id}`,
        method: "PUT",
        data: req.body,
      });
      res.status(200).json(data);
      const movies = JSON.parse(await redis.get("movies"));
      if (movies) {
        let newMovies = [];
        movies.forEach((movie) => {
          if (movie._id === id) movie = data;
          newMovies.push(movie);
        });
        redis.set("movies", JSON.stringify(newMovies));
      }
    } catch (error) {
      res.send(error);
    }
  }

  static async deleteMovie(req, res) {
    try {
      const { id } = req.params;
      const { data } = await axios({
        url: `${url}/${id}`,
        method: "DELETE",
      });
      res.status(200).json(data);
      const movies = JSON.parse(await redis.get("movies"));
      if (movies) {
        let undeleted = movies.filter((movie) => movie._id !== id);
        redis.set("movies", JSON.stringify(undeleted));
      }
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = ControllerMovies;
