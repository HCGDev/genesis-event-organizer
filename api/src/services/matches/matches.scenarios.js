export const standard = defineScenario({
  match: {
    one: {
      round: {
        create: {
          roundNumber: 2300083,
          tournament: {
            create: {
              name: 'String',
              tournamentUrl: 'String1467632',
              startDate: '2021-06-18T20:09:31Z',
              maxPlayers: 9247228,
              locationName: 'String',
            },
          },
        },
      },

      tournament: {
        create: {
          name: 'String',
          tournamentUrl: 'String1813874',
          startDate: '2021-06-18T20:09:31Z',
          maxPlayers: 7581513,
          locationName: 'String',
        },
      },
    },

    two: {
      round: {
        create: {
          roundNumber: 5012092,
          tournament: {
            create: {
              name: 'String',
              tournamentUrl: 'String5219302',
              startDate: '2021-06-18T20:09:31Z',
              maxPlayers: 8303576,
              locationName: 'String',
            },
          },
        },
      },

      tournament: {
        create: {
          name: 'String',
          tournamentUrl: 'String2679271',
          startDate: '2021-06-18T20:09:31Z',
          maxPlayers: 2172733,
          locationName: 'String',
        },
      },
    },
  },
})
