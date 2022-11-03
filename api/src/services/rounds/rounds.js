import { db } from 'src/lib/db'

export const rounds = () => {
  return db.round.findMany()
}

export const round = ({ id }) => {
  return db.round.findUnique({
    where: { id },
  })
}

export const createRound = ({ input }) => {
  return db.round.create({
    data: input,
  })
}

export const updateRound = ({ id, input }) => {
  return db.round.update({
    data: input,
    where: { id },
  })
}

export const deleteRound = ({ id }) => {
  return db.round.delete({
    where: { id },
  })
}

export const Round = {
  tournament: (_obj, { root }) =>
    db.round.findUnique({ where: { id: root.id } }).tournament(),
  matches: (_obj, { root }) =>
    db.round
      .findUnique({ where: { id: root.id } })
      .matches({ orderBy: { id: 'asc' } }),
}
