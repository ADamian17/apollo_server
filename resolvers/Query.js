function feed(parent, args, context) {
  return context.prisma.link.findMany()
}
function info () {
  return `some this will go here`;
}

async function link (parent, args, context) { 
  return context.prisma.link.findUnique({
    where: {
      id: Number(args.id),
    },
  })
}

module.exports = {
  info,
  feed,
  link
}
