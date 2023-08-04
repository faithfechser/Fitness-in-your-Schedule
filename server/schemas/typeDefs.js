const { gql } = require('apollo-server-express');

const typeDefs = gql`  
  type User {
    _id: ID!
    username: String! 
    email: String!
    savedexercises: [Exercise]
    exerciseCount: Int
  }
  type Exercise {
    exerciseId: String
    name: [String]
    type: String
    muscle: String
    difficulty: String
    instructions: String
  }
  input InputExercise {
    exerciseId: String!
    name: [String]
    type: String
    muscle: String
    difficulty: String
    instructions: String
  }
  type Auth {
    token: ID!
    user: User
  }
  type Query {
    me: User
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveExercise(newExercise: InputExercise): User
    removeExercise(exerciseId: ID!): User
  }
`;

module.exports = typeDefs;