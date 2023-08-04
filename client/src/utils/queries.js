// setup for React and Apollo Client
import { gql } from '@apollo/client';

// setup for User data and any saved data
// loads in 'SavedExercise'
export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      bookCount
      savedBooks {
        exerciseId
        name
        type
        muscle
        difficulty
        instructions
      }
    }
  }
`;