import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'

// Used when the environment variable REDWOOD_SECURE_SERVICES=1
export const beforeResolver = (rules) => {
  rules.add(requireAuth)
}

export const matches = () => {
  return db.match.findMany()
}

export const match = ({ id }) => {
  return db.match.findUnique({
    where: { id },
  })
}

export const createMatch = ({ input }) => {
  return db.match.create({
    data: input,
  })
}

export const updateMatch = ({ id, input }) => {
  return db.match.update({
    data: input,
    where: { id },
  })
}

export const deleteMatch = ({ id }) => {
  return db.match.delete({
    where: { id },
  })
}

export const Match = {
  round: (_obj, { root }) =>
    db.match.findUnique({ where: { id: root.id } }).round(),
  tournament: (_obj, { root }) =>
    db.match.findUnique({ where: { id: root.id } }).tournament(),
  players: (_obj, { root }) =>
    db.match.findUnique({ where: { id: root.id } }).players(),
}
