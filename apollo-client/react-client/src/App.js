import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import ApolloClient from 'apollo-client';
import { HttpLink } from "apollo-link-http";
//import { SchemaLink } from "apollo-link-schema";
import { InMemoryCache } from 'apollo-cache-inmemory';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';

import { graphql, ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';

import { typeDefs } from './schema';

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

const ChannelsList = ({ data: {loading, error, channels }}) => {
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  return <ul>
    { channels.map( ch => <li key={ch.id}>{ch.name}</li> ) }
  </ul>;
};

const channelsListQuery = gql`
  query ChannelsListQuery {
    channels {
      id
      name
    }
  }
`;

const ChannelsListWithData = graphql(channelsListQuery)(ChannelsList);

class App extends Component {
  render() {
    return (
      <ApolloProvider client={graphqlClient}>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to Apollo</h2>
          </div>
          <ChannelsListWithData />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;