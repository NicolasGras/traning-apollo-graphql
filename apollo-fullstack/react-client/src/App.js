import React, { Component } from 'react';

import {
  BrowserRouter,
  Link,
  Route,
  Switch,
} from 'react-router-dom';

import logo from './logo.svg';
import './App.css';

import ApolloClient from 'apollo-client';
import { HttpLink } from "apollo-link-http";
//import { SchemaLink } from "apollo-link-schema";
import { WebSocketLink } from 'apollo-link-ws';

import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';

import { InMemoryCache } from 'apollo-cache-inmemory';
import { toIdValue } from 'apollo-utilities';
// import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';

import { ApolloProvider } from 'react-apollo';
// Use of gql and graphql are exported in components files
//import { graphql, ApolloProvider } from 'react-apollo';
//import gql from 'graphql-tag';

//import { typeDefs } from './schema';

import ChannelsListComponent from './components/ChannelList';       // export default from ChannelList.js
import ChannelDetailsComponent from './components/ChannelDetails';  // export default from ChannelDetails.js
import NotFound from './components/NotFound';


// const mocks = {
//   Query: () => ({
  
//     channels: (root, args) => {
//       return [
//         {
//           id: 1,
//           name: "Channel 1"
//         },
//         {
//           id: 2,
//           name: "Channel 2"
//         },
//         {
//           id: 3,
//           name: "Channel 3"
//         }
//       ];
//     }
//   }),
// };

//const schema = makeExecutableSchema({ typeDefs });

// addMockFunctionsToSchema({
//   schema,
//   mocks
// });

//const apolloCache = new InMemoryCache(window.__APOLLO_STATE__);

const apolloCache = new InMemoryCache({
  cacheResolvers: {
    Query: {
      channel: (_, args) => {
        return toIdValue(apolloCache.config.dataIdFromObject({ __typename: 'Channel', id: args['id'] }))
      }
    }
  },
});

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql'
});


const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/subscriptions`,
  options: {
    reconnect: true
  }
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);


const graphqlClient = new ApolloClient({
  cache: apolloCache,
  link: link
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={graphqlClient}>
        <BrowserRouter>
          <div className="App">
            <Link to="/" className="navbar">React + GraphQL Tutorial</Link>
            <Switch>
              <Route exact path="/" component={ChannelsListComponent}/>
              <Route path="/channel/:channelId" component={ChannelDetailsComponent}/>
              <Route component={ NotFound }/>
            </Switch>
          </div>
        </BrowserRouter>

      </ApolloProvider>
    );
  }
}

export default App;