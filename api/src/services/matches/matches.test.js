import {
  matches,
  match,
  createMatch,
  updateMatch,
  deleteMatch,
} from './matches'

describe('matches', () => {
  scenario('returns all matches', async (scenario) => {
    const result = await matches()

    expect(result.length).toEqual(Object.keys(scenario.match).length)
  })

  scenario('returns a single match', async (scenario) => {
    const result = await match({ id: scenario.match.one.id })

    expect(result).toEqual(scenario.match.one)
  })

  scenario('creates a match', async (scenario) => {
    const result = await createMatch({
      input: {
        roundId: scenario.match.two.roundId,
        tournamentId: scenario.match.two.tournamentId,
      },
    })

    expect(result.roundId).toEqual(scenario.match.two.roundId)
    expect(result.tournamentId).toEqual(scenario.match.two.tournamentId)
  })

  scenario('updates a match', async (scenario) => {
    const original = await match({ id: scenario.match.one.id })
    const result = await updateMatch({
      id: original.id,
      input: { roundId: scenario.match.two.roundId },
    })

    expect(result.roundId).toEqual(scenario.match.two.roundId)
  })

  scenario('deletes a match', async (scenario) => {
    const original = await deleteMatch({ id: scenario.match.one.id })
    const result = await match({ id: original.id })

    expect(result).toEqual(null)
  })
})
