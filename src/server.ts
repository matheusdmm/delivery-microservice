import 'dotenv/config';
import { ApolloServer } from 'apollo-server';
import { typeDefs } from './graphql/typedefs';
import { userResolvers } from './graphql/resolvers/users';
import { orderResolvers } from './graphql/resolvers/orders';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

const server = new ApolloServer({
  typeDefs,
  resolvers: [userResolvers, orderResolvers],
  context: ({ req }) => ({ req }),
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground(),
    {
      async requestDidStart(requestContext) {
        console.log('✅ New Request:');
        console.log('✳️ Query:\n', requestContext.request.query);
        console.log(
          '📨 JSON:\n',
          JSON.stringify(requestContext.request.variables, null, 2)
        );
      },
    },
  ],
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`👀 running at ${url}`);
});
