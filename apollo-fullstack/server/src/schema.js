import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';

import { resolvers } from './resolvers';
  
const typeDefs = `
  type Channel {
     id: ID!                # "!" denotes a required field
     name: String
     messages: [Message]!
  }

  type Message {
    id: ID!
    text: String
  }

  input MessageInput{
    channelId: ID!
    text: String
  }
  
  # This type specifies the entry points into our API. In this case
  type Query {
     channels: [Channel]    # "[]" means this is a list of channels
     channel(id: ID!): Channel
  }

  # The mutation root type, used to define all mutations.
  type Mutation {

    # A mutation to add a new channel to the list of channels
    addChannel(name: String!): Channel
  
    # A mutation to add a Message into a Channel
    addMessage(message: MessageInput): Message
  }

  type Subscription {
    messageAdded(channelId: ID!): Message
  }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

export { schema };
  

//#messageAddedChannel(channelId: ID!): Message