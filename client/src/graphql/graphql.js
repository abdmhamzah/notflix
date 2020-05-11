import ApolloClient from "apollo-boost";
import { GET_FAVORITES } from "../pages/Favorites";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  clientState: {
    resolvers: {
      Mutation: {
        addToFavorites: (_root, variables, client) => {
          let { favorites } = client.cache.readQuery({
            query: GET_FAVORITES,
          });
          const movie = { ...variables.movie, __typename: "favorites" };
          favorites = [...favorites, movie];
          client.cache.writeData({
            data: { favorites },
          });
        },
      },
    },
    defaults: {
      favorites: [],
    },
  },
});

export default client;
