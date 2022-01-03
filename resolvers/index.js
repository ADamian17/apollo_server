// `The resolvers object is the actual implementation of the GraphQL schema. Notice how its structure is identical to the structure of the type definition inside typeDefs: Query.info.`
const Query = require('./Query');
const Mutation = require('./Mutation');
const User = require('./User');
const Link = require('./Link');
const Subscription = require('./Subscription');
const Vote = require('./Vote');

module.exports = {
  Query,
  Mutation,
  Subscription,
  User,
  Link,
  Vote
}
