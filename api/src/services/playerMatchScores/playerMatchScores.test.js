import {
  playerMatchScores,
  playerMatchScore,
  createPlayerMatchScore,
  updatePlayerMatchScore,
  deletePlayerMatchScore,
} from './playerMatchScores'

describe('playerMatchScores', () => {
  scenario('returns all playerMatchScores', async (scenario) => {
    const result = await playerMatchScores()

    expect(result.length).toEqual(Object.keys(scenario.playerMatchScore).length)
  })

  scenario('returns a single playerMatchScore', async (scenario) => {
    const result = await playerMatchScore({
      id: scenario.playerMatchScore.one.id,
    })

    expect(result).toEqual(scenario.playerMatchScore.one)
  })

  scenario('creates a playerMatchScore', async (scenario) => {
    const result = await createPlayerMatchScore({
      input: {
        userId: scenario.playerMatchScore.two.userId,
        matchId: scenario.playerMatchScore.two.matchId,
      },
    })

    expect(result.userId).toEqual(scenario.playerMatchScore.two.userId)
    expect(result.matchId).toEqual(scenario.playerMatchScore.two.matchId)
  })

  scenario('updates a playerMatchScore', async (scenario) => {
    const original = await playerMatchScore({
      id: scenario.playerMatchScore.one.id,
    })

    const result = await updatePlayerMatchScore({
      id: original.id,
      input: { matchId: scenario.playerMatchScore.two.userId },
    })

    expect(result.matchId).toEqual(scenario.playerMatchScore.two.userId)
  })

  scenario('deletes a playerMatchScore', async (scenario) => {
    const original = await deletePlayerMatchScore({
      id: scenario.playerMatchScore.one.id,
    })

    const result = await playerMatchScore({ id: original.id })

    expect(result).toEqual(null)
  })
})
