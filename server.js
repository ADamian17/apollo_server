require('dotenv').config()

const fs = require('fs');
const path = require('path');

const { ApolloServer } = require('apollo-server');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const { getUserId } = require('./utils');
const resolvers  = require('./resolvers');

// The typeDefs constant defines your GraphQL schema (more about this in a bit). Here, it defines a simple Query type with one field called info. This field has the type String!. The exclamation mark in the type definition means that this field is required and can never be null.
const typeDefs = fs.readFileSync(
  path.join(__dirname, 'schema/schema.graphql'),
  'utf8'
);

// `Finally, the schema and resolvers are bundled and passed to ApolloServer which is imported from apollo-server. This tells the server what API operations are accepted and how they should be resolved.

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // console.log('headers', req.headers.authorization);
    return {
      ...req,
      prisma,
      userId:
        req && req.headers.authorization
          ? getUserId(req)
          : null
    }
  } 
});

server.listen().then(({url}) => console.log(`server running at ${url}`))
