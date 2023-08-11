// initial setup for Apollo Client for React
import { gql } from '@apollo/client';

// boilerplate for User login controls
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

// boilerplate code to add user
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// boilerplate code to save exercise
export const SAVE_EXERCISE = gql`
  mutation saveExercise($newExercise: InputExercise!) {
    saveExcercise(newExcercise: $newExcercise) {
      _id
      username
      email
      excerciseCount
      savedExcercise {
        ExcerciseId
        name
        type
        muscle
        difficulty
        instructions
      }
    }
  }
`;

// boilerplate code to remove exercise
export const REMOVE_EXERCISE = gql`
  mutation removeExercise($exerciseId: ID!) {
    removeExercise(ExerciseId: $ExerciseId) {
      _id
      username
      email
      exerciseCount
      savedExercise {
        ExerciseId
        name
        type
        muscle
        difficulty 
        instructions
      }
    }
  }
`;