import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import mocks from './mocks';
import resolvers from './resolvers'

const typeDefs = `
type Query {
  testString: String
  author(firstName: String, lastName: String): Author
  allAuthors: [Author]
  getFortuneCookie: String # we'll use this later
}

type Author {
  id: Int!
  firstName: String!
  lastName: String!
  createdAt: String
  posts: [Post]
}

type Post {
  id: Int!
  title: String
  text: String
  views: Int
  author: Author
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

// console.log("==============================================");
// console.log(schema);
// console.log("==============================================");


//addMockFunctionsToSchema({ schema, mocks });

export default schema;
