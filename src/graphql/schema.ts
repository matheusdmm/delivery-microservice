import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Order {
    id: ID!
    customer: String!
    item: String!
    status: String!
    created_at: String!
  }

  type User {
    id: ID!
    username: String!
  }

  type Query {
    orders: [Order!]!
    getUser(id: ID!): User
  }

  type Mutation {
    createOrder(customer: String!, item: String!): Order!
    createUser(username: String!, password: String!): User!
  }
`;
