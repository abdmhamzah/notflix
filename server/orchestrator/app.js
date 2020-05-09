const { ApolloServer, gql } = require("apollo-server");
const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis();
const urlMovies = "http://localhost:3002/movies";
const urlTvSeries = "http://localhost:3003/tv";

const typeDefs = gql`
  type Movie {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type TvSerie {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type Query {
    movies: [Movie]
    movie(idMovie: ID!): Movie
    tvSeries: [TvSerie]
    tvSerie(idTvSerie: ID!): TvSerie
  }

  input InputUser {
    title: String!
    overview: String!
    poster_path: String!
    popularity: Float!
    tags: String!
  }

  type DeleteMessage {
    deletedCount: Int
  }

  type Mutation {
    addMovie(inputData: InputUser): Movie
    updateMovie(idMovie: ID!, inputData: InputUser): Movie
    deleteMovie(idMovie: ID!): DeleteMessage
    addTvSerie(inputData: InputUser): TvSerie
    updateTvSerie(idTvSerie: ID!, inputData: InputUser): TvSerie
    deleteTvSerie(idTvSerie: ID!): DeleteMessage
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
      }
    },
    tvSeries: async () => {
      try {
        const tvSeries = JSON.parse(await redis.get("tvSeries"));
        if (tvSeries) {
          return tvSeries;
        } else {
          const { data } = await axios({
            url: urlTvSeries,
            method: "GET",
          });
          redis.set("tvSeries", JSON.stringify(data));
          return data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    tvSerie: async (parent, args, contex, info) => {
      try {
        const { idTvSerie } = args;
        const tvSerie = JSON.parse(await redis.get("tvSerie"));
        if (tvSerie && tvSerie._id === idTvSerie) {
          return tvSerie;
        } else {
          const { data } = await axios({
            url: `${urlTvSeries}/${idTvSerie}`,
            method: "GET",
          });
          redis.set("tvSerie", JSON.stringify(data));
          return data;
        }
      } catch (error) {
        console.log(error);
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
      }
    },
    updateMovie: async (parent, args, contex, info) => {
      try {
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
          return data;
        }
      } catch (error) {
        console.log(error);
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
      }
    },
    addTvSerie: async (parent, args, contex, info) => {
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
          url: urlTvSeries,
          method: "POST",
          data: input,
        });
        const tvSeries = JSON.parse(await redis.get("tvSeries"));
        if (tvSeries) {
          tvSeries.push(data);
          redis.set("tvSeries", JSON.stringify(tvSeries));
        }
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    updateTvSerie: async (parents, args, contex, info) => {
      try {
        const {
          title,
          overview,
          poster_path,
          popularity,
          tags,
        } = args.inputData;
        const input = { title, overview, poster_path, popularity, tags };
        const { idTvSerie } = args;
        const { data } = await axios({
          url: `${urlTvSeries}/${idTvSerie}`,
          method: "PUT",
          data: input,
        });
        const tvSeries = JSON.parse(await redis.get("tvSeries"));
        if (tvSeries) {
          let newTvSeries = [];
          tvSeries.forEach((tvSerie) => {
            if (tvSerie._id === idTvSerie) tvSerie = data;
            newtvSeries.push(tvSerie);
          });
          redis.set("tvSeries", JSON.stringify(newTvSeries));
        }
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    deleteTvSerie: async (parent, args, contex, info) => {
      try {
        const { idTvSerie } = args;
        const { data } = await axios({
          url: `${urlTvSeries}/${idTvSerie}`,
          method: "DELETE",
        });
        const tvSeries = JSON.parse(await redis.get("tvSeries"));
        if (tvSeries) {
          let undeleted = tvSeries.filter(
            (tvSerie) => tvSerie._id !== idTvSerie
          );
          redis.set("tvSeries", JSON.stringify(undeleted));
        }
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
