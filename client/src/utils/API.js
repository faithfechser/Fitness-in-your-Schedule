// variables for API request 
const request = require('request');
let muscle = '';

// route to get logged in user's info (needs the token)
export const getMe = (token) => {
    return fetch('/api/users/me', {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    });
  };
  
  export const createUser = (userData) => {
    return fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
  };
  
  export const loginUser = (userData) => {
    return fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
  };
  
  // save exercise data for a logged in user
  export const saveExercise = (excerciseData, token) => {
    return fetch('/api/users', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(excerciseData),
    });
  };
  
  // remove saved exercise data for a logged in user
  export const deleteExercise = (excerciseId, token) => {
    return fetch(`/api/users/books/${excerciseId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  };
  

// make a request to the API to get exercises 
request.get({
    url: 'https://api.api-ninjas.com/v1/exercises?muscle=' + muscle,
    headers: {
      'X-Api-Key': 'Z5lGAMROpA1mmSZzDm+eHA==EHhBWQwj1ishogpN'
    },
  }, function(error, response, body) {
    if(error) return console.error('Request failed:', error);
    else if(response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
    // else console.log(body)
  });