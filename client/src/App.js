import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// new
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import SearchExercise from './pages/SearchExercise';
import SavedExercise from './pages/SavedExercise';
import Navbar from './components/Navbar';
import Header from './components/Header';


// Construct the main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Header />
          <Navbar />
          <Routes>
            <Route path='/' element={<SearchExercise />} />
            <Route path='/saved' element={<SavedExercise />} />
            <Route path='*' element={<h1 className='display-2'>Wrong page!</h1>} />
          </Routes>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
