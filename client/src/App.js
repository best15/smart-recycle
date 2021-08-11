import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Centers from './pages/RecycleCenters';
import Header from './components/Header';

// import Footer from './components/Footer';

import Auth from './utils/auth';


// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
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
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});



function App() {
  return (
    <ApolloProvider client={client}>
      <Router>

        <Header />
        <Route exact path="/">
          {Auth.loggedIn() ? (<Home />) : <Login />}
        </Route>
        <Route exact path="/Centers">
          {Auth.loggedIn() ? (<Centers />) : <Login />}
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>

      </Router>
    </ApolloProvider>
  );
}

export default App;
