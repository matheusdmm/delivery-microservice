import 'dotenv/config';
import { ApolloServer } from 'apollo-server';
import { typeDefs } from './graphql/typedefs';
import { userResolvers } from './graphql/resolvers/users';
import { orderResolvers } from './graphql/resolvers/orders';

const server = new ApolloServer({
  typeDefs,
  resolvers: [userResolvers, orderResolvers],
  context: ({ req }) => ({ req }),
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
