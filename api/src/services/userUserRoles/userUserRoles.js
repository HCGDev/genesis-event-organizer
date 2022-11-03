import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'

// Used when the environment variable REDWOOD_SECURE_SERVICES=1
export const beforeResolver = (rules) => {
  rules.add(requireAuth)
}

export const userUserRoles = () => {
  return db.userUserRole.findMany()
}

export const userUserRole = ({ id }) => {
  return db.userUserRole.findUnique({
    where: { id },
  })
}

export const createUserUserRole = ({ input }) => {
  return db.userUserRole.create({
    data: input,
  })
}

export const updateUserUserRole = ({ id, input }) => {
  return db.userUserRole.update({
    data: input,
    where: { id },
  })
}

export const deleteUserUserRole = ({ id }) => {
  return db.userUserRole.delete({
    where: { id },
  })
}

export const UserUserRole = {
  user: (_obj, { root }) =>
    db.userUserRole.findUnique({ where: { id: root.id } }).user(),
  userRole: (_obj, { root }) =>
    db.userUserRole.findUnique({ where: { id: root.id } }).userRole(),
}
