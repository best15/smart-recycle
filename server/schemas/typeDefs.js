const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    password: String
    
  }

  type Auth {
    token: ID!
    user: User
  }
  type Material {
    _id: ID
    materialname: String
      
  }
  type MaterialCategory {
    _id: ID
    categoryname: String
    materials: [Material]
  }

  type RecycleCenter {
    _id: ID
    centername: String
    address: String
    materials: [Material]
  }


  type Query {
    users: [User]
    user(username: String!): User
    materials: [Material]
    recycleCenters: [RecycleCenter]
    categories: [MaterialCategory]
    
  }

  type Mutation {
    addUser(username: String!,password: String!): Auth
    login(username: String!, password: String!): Auth

  }
`;

module.exports = typeDefs;
