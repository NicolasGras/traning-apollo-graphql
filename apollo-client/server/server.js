//import express from 'express';
const express = require('express');

import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';

import bodyParser from 'body-parser';

import schema from './src/schema';

const PORT = 4000;

const server = express();

server.get('/', function (req, res) {
  res.send('Hello World!');
});

server.listen(PORT, () => console.log(`GraphQL Server is now running on http://localhost:${PORT}`));