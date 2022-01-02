const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { getUserId } = require('../utils')


async function signup(parent, args, context, info) {
  // 1
  const password = await bcrypt.hash(args.password, 10)

  // 2
  const user = await context.prisma.user.create({ data: { ...args, password } })

  // 3
  const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET)

  // 4
  return {
    token,
    user,
  }
}

async function login(parent, args, context, info) {
  // 1
  const user = await context.prisma.user.findUnique({ where: { email: args.email } })

  if (!user) {
    throw new Error('No such user found')
  }

  // 2
  const valid = await bcrypt.compare(args.password, user.password)
  if (!valid) {
    throw new Error('Invalid password')
  }

  const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET)

  // 3
  return {
    token,
    user,
  }
}

async function post(parent, args, context, info) {
  const { userId } = context;
  console.log({ userId });

  return await context.prisma.link.create({
    data: {
      url: args.url,
      description: args.description,
      postedBy: { 
        connect: { 
          id: userId 
        } 
      },
    }
  })
}

const updateLink = async (parent, args, context, info) => {
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
}

const deleteLink = async (parent, args, context, info) => {
  const deletedLink = context.prisma.link.delete({
    where: { 
      id: Number(args.id)
    },
  });

  return deletedLink;
}

module.exports = {
  signup,
  login,
  post,
  updateLink,
  deleteLink
}