// `The resolvers object is the actual implementation of the GraphQL schema. Notice how its structure is identical to the structure of the type definition inside typeDefs: Query.info.`

module.exports = {
  Query: {
    info: () => `some this will go here`,
    feed: async (parent, args, context) => context.prisma.link.findMany(),
  },
  Mutation: {
    post: (parent, args, context, info) => {
      const newLink = context.prisma.link.create({
        data: {
          url: args.url,
          description: args.description,
        },
      })
      return newLink
    },
    updateLink: async (parent, args, context, info) => {
      const updatedLink = context.prisma.link.update({
        where: {
          id: Number(args.id),
        },
        data: {
          url: args.url,
          description: args.description,
        },
      }) 

      return updatedLink;
    },
    deleteLink: async (parent, args, context, info) => {
      const deletedLink = context.prisma.link.delete({
        where: { 
          id: Number(args.id)
        },
      });

      return deletedLink;
    }
  },
  Link: {
    id: (parent) => parent.id,
    description: (parent) => parent.description,
    url: (parent) => parent.url,
  }
}