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
      exerciseCount
      savedExercises {
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
// export const GET_ME = gql`
//     query me {
//         me {
//             _id
//             username
//             email
//             cardio {
//                 _id
//                 name
//                 distance
//                 duration
//                 date
//             }
//             strength {
//                 _id
//                 name
//                 weight
//                 sets
//                 reps
//                 date
//             }
//         }
//     }
// `;


export const GET_EXERCISES = gql`
  query exercisesByMuscle($muscle: String!) {
    getExercises(muscle: $muscle) {
      name
      type
      muscle
      equipment
      difficulty
      instructions
    }
  }
`;