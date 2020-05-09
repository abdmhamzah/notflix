const { ApolloServer, gql } = require("apollo-server");
const axios = require("axios");
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
    tvSeries: [TvSerie]
  }
`;

const resolvers = {
  Query: {
    movies: () => {
      return axios({
        url: urlMovies,
        method: "GET",
      })
        .then(({ data }) => {
          return data;
        })
        .catch(console.log);
    },
    tvSeries: () => {
      return axios({
        url: urlTvSeries,
        method: "GET",
      })
        .then(({ data }) => {
          return data;
        })
        .catch(console.log);
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
