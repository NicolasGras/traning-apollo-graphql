const express = require('express')
const app = express()

const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

// Some fake data
const books = [
  {
    title: "Harry Potter and the Sorcerer's stone",
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  }
];

// The GraphQL schema in string form
const typeDefs = `
  type Query { books: [Book] },
  type Book { title: String, author: String }
`;

// The resolvers
const resolvers = {
  Query: { books: () => books }
};

// Put together in a schema
const myGraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers
});

app.get('/', function (req, res) {
  res.send('Hello World!')
})

// The GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress({ myGraphQLSchema }));

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));


app.listen(3000, function () {
  console.log('Go to http://localhost:3000/graphiql to run queries!')
})
