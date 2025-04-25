import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Query {
    orders: [Order!]!
  }

  type Mutation {
    createOrder(input: CreateOrderInput!): Order!
    createUser(email: String!, password: String!): String!
    loginUser(email: String!, password: String!): String!
  }

  input CreateOrderInput {
    customer: String!
    items: [OrderItemInput!]!
  }

  input OrderItemInput {
    name: String!
    quantity: Int!
    size: String!
    flavors: [String!]!
  }

  type Order {
    id: ID!
    customer: String!
    items: [OrderItem!]!
    status: String!
  }

  type OrderItem {
    name: String!
    quantity: Int!
    size: String!
    flavors: [String!]!
  }
`;
