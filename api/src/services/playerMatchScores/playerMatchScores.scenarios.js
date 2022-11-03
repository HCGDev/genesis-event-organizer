export const standard = defineScenario({
  playerMatchScore: {
    one: {
      match: {
        create: {
          round: {
            create: {
              roundNumber: 2457639,
              tournament: {
                create: {
                  name: 'String',
                  tournamentUrl: 'String6181323',
                  startDate: '2021-06-18T20:13:17Z',
                  maxPlayers: 176524,
                  locationName: 'String',
                },
              },
            },
          },

          tournament: {
            create: {
              name: 'String',
              tournamentUrl: 'String3317899',
              startDate: '2021-06-18T20:13:17Z',
              maxPlayers: 7685951,
              locationName: 'String',
            },
          },
        },
      },

      user: { create: { nickname: 'String2134925', email: 'String8940004' } },
    },

    two: {
      match: {
        create: {
          round: {
            create: {
              roundNumber: 4637100,
              tournament: {
                create: {
                  name: 'String',
                  tournamentUrl: 'String2968430',
                  startDate: '2021-06-18T20:13:17Z',
                  maxPlayers: 5083670,
                  locationName: 'String',
                },
              },
            },
          },

          tournament: {
            create: {
              name: 'String',
              tournamentUrl: 'String1998869',
              startDate: '2021-06-18T20:13:17Z',
              maxPlayers: 7076700,
              locationName: 'String',
            },
          },
        },
      },

      user: { create: { nickname: 'String4705864', email: 'String8295994' } },
    },
  },
})
