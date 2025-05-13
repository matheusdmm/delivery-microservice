import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Query {
    orders: [Order!]!
    myOrders: [Order!]!
  }

  type Mutation {
    createOrder(input: CreateOrderInput!): Order!
    createUser(email: String!, password: String!): String!
    loginUser(email: String!, password: String!): String!
  }

  input CreateOrderInput {
    customer: String!
    items: [OrderItemInput!]!
    address: String!
    paymentMethod: String!
    estimatedTime: String!
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
    address: String!
    paymentMethod: String!
    estimatedTime: String!
    status: String!
  }

  type OrderItem {
    name: String!
    quantity: Int!
    size: String!
    flavors: [String!]!
  }
`;
