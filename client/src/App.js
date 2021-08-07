import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  // createHttpLink,
} from '@apollo/client';
// import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// import Home from './pages/Home';
// import Profile from './pages/Profile';
// import Signup from './pages/Signup';
import Login from './pages/Login';
import Header from './components/Header';
// import Footer from './components/Footer';

// // Construct our main GraphQL API endpoint
// const httpLink = createHttpLink({
//   uri: '/graphql',
// });

// // Construct request middleware that will attach the JWT token to every request as an `authorization` header
// const authLink = setContext((_, { headers }) => {
//   // get the authentication token from local storage if it exists
//   const token = localStorage.getItem('id_token');
//   // return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : '',
//     },
//   };
// });

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        {/* <div className="flex-column justify-flex-start min-100-vh"> */}
        <Header />
        {/* <Route exact path="/login"> */}
        <Login />
        {/* </Route> */}
        {/* <div className="container">
            <Route exact path="/">
              <Home />
            </Route>
            
           
            <Route exact path="/signup">
              <Signup />
            </Route>

          </div>
          <Footer /> */}
        {/* </div> */}
      </Router>
    </ApolloProvider>
  );
}

export default App;
