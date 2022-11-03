import newStorePending from 'src/emails/newStorePending'
import { sendEmail } from 'src/helpers/sendEmail'
import { db } from 'src/lib/db'

export const users = ({ searchTerm }) => {
  return db.user.findMany({
    where: {
      OR: [
        {
          id: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        },
        {
          nickname: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        },
        {
          firstname: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        },
        {
          lastname: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        },
        {
          email: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        },
      ],
    },
  })
}

export const user = ({ id }) => {
  return db.user.findUnique({
    where: { id },
  })
}

export const createUser = async ({ input, storeInput }) => {
  if (input.role !== 'EO' && input.role !== 'PLAYER')
    throw Error('Incorrect User Role')
  var role = await db.userRole.findFirst({ where: { name: input.role } })
  var currentUser = context.currentUser

  var provider = await db.provider.findUnique({
    where: { uid: currentUser.uid },
  })

  var newData = { ...input }
  delete newData.role

  if (input.imageId) {
    newData.photo = { connect: { id: input.imageId } }
    delete newData.imageId
  }

  const user = await db.user.create({
    data: {
      ...newData,
      providers: { connect: [{ id: provider.id }] },
    },
  })

  await db.userUserRole.create({
    data: {
      user: {
        connect: {
          id: user.id,
        },
      },
      userRole: {
        connect: {
          id: role.id,
        },
      },
    },
  })

  //Create store
  if (storeInput) {
    let store = await db.store.create({
      data: {
        ...storeInput,
        owner: { connect: { id: user.id } },
      },
    })

    let html = `${newStorePending({ store }).html}`
    sendEmail({
      to: process.env.ADMIN_EMAILS,
      subject: `GEO: New Pending Store: ${store.name}`,
      html,
      text: `New Pending Store: ${store.name}`,
    })
  }

  return user
}

export const checkNickname = async ({ nickname }) => {
  let numUsers = await db.user.findMany({ where: { nickname } })
  return numUsers.length > 0 ? false : true
}

export const updateUser = ({ id, input }) => {
  var newData = { ...input }

  if (input.imageId) {
    newData.photo = { connect: { id: input.imageId } }
    delete newData.imageId
  }

  return db.user.update({
    data: { ...newData },
    where: { id },
  })
}

export const deleteUser = ({ id }) => {
  return db.user.delete({
    where: { id },
  })
}

export const User = {
  photo: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).photo(),
  Contact: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).Contact(),
  matches: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).matches(),
  tournamentsPlayed: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).tournamentsPlayed(),
  providers: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).providers(),
  Store: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).Store(),
  tournamentsOwned: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).tournamentsOwned(),
  Tournament: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).Tournament(),
  UserUserRole: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).UserUserRole(),
}
