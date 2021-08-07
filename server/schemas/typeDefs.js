const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Profile {
    _id: ID
    userName: String
    password: String
    
  }

  type Auth {
    token: ID!
    profile: Profile
  }

  type Query {
    profiles: [Profile]!
    profile(profileId: ID!): Profile
  }

  type Mutation {
    createProfile(userName: String!,password: String!): Auth
    login(userName: String!, password: String!): Auth

  }
`;

module.exports = typeDefs;
