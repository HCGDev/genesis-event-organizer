import { db } from 'src/lib/db'

export const seedTournaments = ({ country = '', numTournaments = 5 }) => {
  //Create numTournaments in country (if country not provided, use a random element from country array)
  return []
}

export const seedSingleTournament = async ({ id, numPlayers = 8 }) => {
  const tournament = await db.tournament.findUnique({ where: { id } })

  if (process.env.ENV !== 'PROD') {
    for (let i = 1; i <= numPlayers; i++) {
      //If PlayerI with PlayerI@gmail.com does not exist, create them
      let player = await db.user.findFirst({
        where: { nickname: `Player${i}` },
      })

      if (!player) {
        player = await db.user.create({
          data: {
            firstname: 'Player',
            lastname: `${i}`,
            nickname: `Player${i}`,
            email: `Player${i}@gmail.com`,
          },
        })
      }

      await db.playerTournamentScore.create({
        data: {
          player: {
            connect: { id: player.id },
          },
          tournament: {
            connect: { id },
          },
        },
      })
    }
  }

  return tournament
}
