import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'

// Used when the environment variable REDWOOD_SECURE_SERVICES=1
export const beforeResolver = (rules) => {
  rules.add(requireAuth)
}

export const playerMatchScores = () => {
  return db.playerMatchScore.findMany()
}

export const playerMatchScore = ({ id }) => {
  return db.playerMatchScore.findUnique({
    where: { id },
  })
}

export const createPlayerMatchScore = ({ input }) => {
  return db.playerMatchScore.create({
    data: input,
  })
}

export const updatePlayerMatchScore = ({ id, input }) => {
  return db.playerMatchScore.update({
    data: input,
    where: { id },
  })
}

export const deletePlayerMatchScore = ({ id }) => {
  return db.playerMatchScore.delete({
    where: { id },
  })
}

export const PlayerMatchScore = {
  match: (_obj, { root }) =>
    db.playerMatchScore.findUnique({ where: { id: root.id } }).match(),
  user: (_obj, { root }) =>
    db.playerMatchScore.findUnique({ where: { id: root.id } }).user(),
}
