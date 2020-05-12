const { gql } = require("apollo-server");
const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis();
const urlMovies = "http://localhost:3002/movies";

const typeDefs = gql`
  type Movie {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  extend type Query {
    movies: [Movie]
    movie(idMovie: ID!): Movie
  }

  input InputMovie {
    title: String!
    overview: String!
    poster_path: String!
    popularity: Float!
    tags: String!
  }

  type DeletedMovieMessage {
    deletedCount: Int
  }

  extend type Mutation {
    addMovie(inputData: InputMovie!): Movie
    updateMovie(idMovie: ID!, inputData: InputMovie!): Movie
    deleteMovie(idMovie: ID!): DeletedMovieMessage
  }
`;

const resolvers = {
  Query: {
    movies: async () => {
      try {
        const movies = JSON.parse(await redis.get("movies"));
        if (movies) {
          return movies;
        } else {
          const { data } = await axios({
            url: urlMovies,
            method: "GET",
          });
          redis.set("movies", JSON.stringify(data));
          return data;
        }
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    movie: async (parent, args, contex, info) => {
      try {
        const { idMovie } = args;
        const movie = JSON.parse(await redis.get("movie"));
        if (movie && movie._id === idMovie) {
          return movie;
        } else {
          const { data } = await axios({
            url: `${urlMovies}/${idMovie}`,
            method: "GET",
          });
          redis.set("movie", JSON.stringify(data));
          return data;
        }
      } catch (error) {
        console.log(error);
        return error;
      }
    },
  },

  Mutation: {
    addMovie: async (parent, args, contex, info) => {
      try {
        const {
          title,
          overview,
          poster_path,
          popularity,
          tags,
        } = args.inputData;
        const input = { title, overview, poster_path, popularity, tags };
        const { data } = await axios({
          url: urlMovies,
          method: "POST",
          data: input,
        });
        const movies = JSON.parse(await redis.get("movies"));
        if (movies) {
          movies.push(data);
          redis.set("movies", JSON.stringify(movies));
        }
        return data;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    updateMovie: async (parent, args, contex, info) => {
      try {
        redis.del("movies");
        const {
          title,
          overview,
          poster_path,
          popularity,
          tags,
        } = args.inputData;
        const input = { title, overview, poster_path, popularity, tags };
        const { idMovie } = args;
        const { data } = await axios({
          url: `${urlMovies}/${idMovie}`,
          method: "PUT",
          data: input,
        });
        const movies = JSON.parse(await redis.get("movies"));
        if (movies) {
          let newMovies = [];
          movies.forEach((movie) => {
            if (movie._id === idMovie) movie = data;
            newMovies.push(movie);
          });
          redis.set("movies", JSON.stringify(newMovies));
        }
        return data;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    deleteMovie: async (parent, args, contex, info) => {
      try {
        const { idMovie } = args;
        const { data } = await axios({
          url: `${urlMovies}/${idMovie}`,
          method: "DELETE",
        });
        const movies = JSON.parse(await redis.get("movies"));
        if (movies) {
          let undeleted = movies.filter((movie) => movie._id !== idMovie);
          redis.set("movies", JSON.stringify(undeleted));
        }
        return data;
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
