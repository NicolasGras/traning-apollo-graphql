import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import bodyParser from 'body-parser';
import schema from './data/schema';

import compression from 'compression';  // Add Apollo Engine to server
import { Engine } from 'apollo-engine'; // ...

const GRAPHQL_PORT = 3000;

const ENGINE_API_KEY = 'service:NicolasGras-7982:B_GqQ3x7lMC3PlyhaUXEgg'; // TODO - Add Apollo Engine to server

const graphQLServer = express();

// Add Apollo Engine to server (Start)
const engine = new Engine({
  engineConfig: {
    apiKey: ENGINE_API_KEY
  },
  graphqlPort: GRAPHQL_PORT
});

engine.start();

graphQLServer.use(engine.expressMiddleware());

graphQLServer.use(compression());
// Add Apollo Engine to server (End)

graphQLServer.use('/graphql', 
                    bodyParser.json(), 
                    graphqlExpress(
                      { schema,
                        tracing: true   // Add Apollo Engine to server (This option turns on tracing)
                      }
                    )
                  );


graphQLServer.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

graphQLServer.listen(GRAPHQL_PORT, () =>
  console.log(
    `GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql`
  )
);
