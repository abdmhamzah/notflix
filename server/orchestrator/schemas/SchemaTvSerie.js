const { gql } = require("apollo-server");
const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis();
const urlTvSeries = "http://localhost:3003/tv";

const typeDefs = gql`
  type TvSerie {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  extend type Query {
    tvSeries: [TvSerie]
    tvSerie(idTvSerie: ID!): TvSerie
  }

  input InputTvSerie {
    title: String!
    overview: String!
    poster_path: String!
    popularity: Float!
    tags: String!
  }

  type DeletedTvMessage {
    deletedCount: Int
  }

  extend type Mutation {
    addTvSerie(inputData: InputTvSerie): TvSerie
    updateTvSerie(idTvSerie: ID!, inputData: InputTvSerie): TvSerie
    deleteTvSerie(idTvSerie: ID!): DeletedTvMessage
  }
`;

const resolvers = {
  Query: {
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

module.exports = {
  typeDefs,
  resolvers,
};
