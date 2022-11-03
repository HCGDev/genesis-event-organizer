import { db } from 'src/lib/db'

export const userPictures = () => {
  return db.userPicture.findMany()
}

export const userPicture = ({ id }) => {
  return db.userPicture.findUnique({
    where: { id },
  })
}

export const createUserPicture = ({ input }) => {
  return db.userPicture.create({
    data: input,
  })
}

export const updateUserPicture = ({ id, input }) => {
  return db.userPicture.update({
    data: input,
    where: { id },
  })
}

export const deleteUserPicture = ({ id }) => {
  return db.userPicture.delete({
    where: { id },
  })
}

export const UserPicture = {
  user: (_obj, { root }) =>
    db.userPicture.findUnique({ where: { id: root.id } }).user(),
}
