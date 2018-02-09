import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import ApolloClient from 'apollo-client';
import { HttpLink } from "apollo-link-http";
//import { SchemaLink } from "apollo-link-schema";
import { InMemoryCache } from 'apollo-cache-inmemory';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';

import { ApolloProvider } from 'react-apollo';
// Use of gql and graphql are exported in components files
//import { graphql, ApolloProvider } from 'react-apollo';
//import gql from 'graphql-tag';

import { typeDefs } from './schema';

import ChannelsListComponent from './components/ChannelList';   // export default from ChannelList.js

const mocks = {
  Query: () => ({
  
    channels: (root, args) => {
      return [
        {
          id: 1,
          name: "Channel 1"
        },
        {
          id: 2,
          name: "Channel 2"
        },
        {
          id: 3,
          name: "Channel 3"
        }
      ];
    }
  }),
};

const schema = makeExecutableSchema({ typeDefs });

addMockFunctionsToSchema({
  schema,
  mocks
});

const apolloCache = new InMemoryCache(window.__APOLLO_STATE__);

const graphqlClient = new ApolloClient({
  cache: apolloCache,
  link: new HttpLink({uri: 'http://localhost:4000/graphql'})
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={graphqlClient}>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to Apollo</h2>
          </div>
          <ChannelsListComponent />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;