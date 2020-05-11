const { gql } = require("apollo-server");
const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis();
const urlMovies = "http://localhost:3002/movies";
const urlTvSeries = "http://localhost:3003/tv";

const typeDefs = gql`
  type Movies {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type TvSeries {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type Entertainme {
    movies: [Movies]
    tvSeries: [TvSeries]
  }

  extend type Query {
    getAll: Entertainme
  }
`;

const resolvers = {
  Query: {
    getAll: async () => {
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
        return movieTv;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
