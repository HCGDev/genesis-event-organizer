import {
  tournaments,
  tournament,
  createTournament,
  updateTournament,
  deleteTournament,
} from './tournaments'

describe('tournaments', () => {
  scenario('returns all tournaments', async (scenario) => {
    const result = await tournaments()

    expect(result.length).toEqual(Object.keys(scenario.tournament).length)
  })

  scenario('returns a single tournament', async (scenario) => {
    const result = await tournament({ id: scenario.tournament.one.id })

    expect(result).toEqual(scenario.tournament.one)
  })

  scenario('creates a tournament', async (scenario) => {
    const result = await createTournament({
      input: {
        name: 'String',
        tournamentUrl: 'String1351484',
        startDate: '2021-06-18T14:47:23Z',
        maxPlayers: 4458760,
        locationName: 'String',
      },
    })

    expect(result.name).toEqual('String')
    expect(result.tournamentUrl).toEqual('String1351484')
    expect(result.startDate).toEqual('2021-06-18T14:47:23Z')
    expect(result.maxPlayers).toEqual(4458760)
    expect(result.locationName).toEqual('String')
  })

  scenario('updates a tournament', async (scenario) => {
    const original = await tournament({ id: scenario.tournament.one.id })
    const result = await updateTournament({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a tournament', async (scenario) => {
    const original = await deleteTournament({ id: scenario.tournament.one.id })
    const result = await tournament({ id: original.id })

    expect(result).toEqual(null)
  })
})
