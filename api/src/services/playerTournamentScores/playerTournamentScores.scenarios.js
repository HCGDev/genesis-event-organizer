export const standard = defineScenario({
  playerTournamentScore: {
    one: {
      player: { create: { nickname: 'String7571464', email: 'String3806360' } },
      tournament: {
        create: {
          name: 'String',
          tournamentUrl: 'String199399',
          startDate: '2021-06-18T20:05:56Z',
          maxPlayers: 5512874,
          locationName: 'String',
        },
      },
    },

    two: {
      player: { create: { nickname: 'String4184813', email: 'String9781355' } },
      tournament: {
        create: {
          name: 'String',
          tournamentUrl: 'String4334714',
          startDate: '2021-06-18T20:05:56Z',
          maxPlayers: 329297,
          locationName: 'String',
        },
      },
    },
  },
})
