const { ApolloServer, makeExecutableSchema } = require("apollo-server");
const SchemaMovie = require("./schemas/SchemaMovie");
const SchemaTvSerie = require("./schemas/SchemaTvSerie");
const SchemaEntertainMe = require("./schemas/SchemaEntertainMe");

const typeDefs = `
  type Query
  type Mutation
`;

const schema = makeExecutableSchema({
  typeDefs: [
    typeDefs,
    SchemaMovie.typeDefs,
    SchemaTvSerie.typeDefs,
    SchemaEntertainMe.typeDefs,
  ],
  resolvers: [
    SchemaMovie.resolvers,
    SchemaTvSerie.resolvers,
    SchemaEntertainMe.resolvers,
  ],
});

const server = new ApolloServer({ schema });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
