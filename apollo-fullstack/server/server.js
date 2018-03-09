//import express from 'express';
const express = require('express');

import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';

import bodyParser from 'body-parser';

import { schema } from './src/schema';

import cors from 'cors';

import { execute, subscribe } from 'graphql';
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';

const PORT = 4000;

const server = express();
server.use('*', cors({ origin: 'http://localhost:3000' }));

// server.get('/', function (req, res) {
//   res.send('Hello World!');
// });

// console.log("########################################");
// console.log(schema);
// console.log("########################################");

server.use('/graphql', bodyParser.json(), graphqlExpress({
  schema
}));

server.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
  subscriptionsEndpoint: `ws://localhost:4000/subscriptions`
}));

// We wrap the express server so that we can attach the WebSocket for subscriptions
const ws = createServer(server);

ws.listen(PORT, () => {
  
  console.log("############################################################");
  
  console.log(`GraphQL Server is now running on http://localhost:${PORT}`);

  console.log("############################################################");
  
  // Set up the WebSocket for handling GraphQL subscriptions
  new SubscriptionServer({
    execute,
    subscribe,
    schema
  }, {
    server: ws,
    path: '/subscriptions',
  });
});