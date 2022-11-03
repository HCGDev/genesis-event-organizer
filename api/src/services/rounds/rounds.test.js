import { rounds, round, createRound, updateRound, deleteRound } from './rounds'

describe('rounds', () => {
  scenario('returns all rounds', async (scenario) => {
    const result = await rounds()

    expect(result.length).toEqual(Object.keys(scenario.round).length)
  })

  scenario('returns a single round', async (scenario) => {
    const result = await round({ id: scenario.round.one.id })

    expect(result).toEqual(scenario.round.one)
  })

  scenario('creates a round', async (scenario) => {
    const result = await createRound({
      input: {
        tournamentId: 'scenario.round.two.tournamentId',
        roundNumber: 9657718,
      },
    })

    expect(result.tournamentId).toEqual('scenario.round.two.tournamentId')
    expect(result.roundNumber).toEqual(9657718)
  })

  scenario('updates a round', async (scenario) => {
    const original = await round({ id: scenario.round.one.id })
    const result = await updateRound({
      id: original.id,
      input: { roundNumber: 3901960 },
    })

    expect(result.roundNumber).toEqual(3901960)
  })

  scenario('deletes a round', async (scenario) => {
    const original = await deleteRound({ id: scenario.round.one.id })
    const result = await round({ id: original.id })

    expect(result).toEqual(null)
  })
})
