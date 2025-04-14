import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Order {
    id: ID!
    customer: String!
    item: String!
    status: String!
    created_at: String!
  }

  type Query {
    orders: [Order!]!
  }

  type Mutation {
    createOrder(item: String!): Order!
    createUser(email: String!, password: String!): String!
    loginUser(email: String!, password: String!): String!
  }
`;
