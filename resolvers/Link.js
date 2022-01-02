const id = (parent) => parent.id;

const description = (parent) => parent.description;

const url = (parent) => parent.url;

function postedBy(parent, args, context) {
  return context.prisma.link.findUnique({ where: { id: parent.id } }).postedBy()
}

module.exports = {
  id,
  description,
  url,
  postedBy,
}