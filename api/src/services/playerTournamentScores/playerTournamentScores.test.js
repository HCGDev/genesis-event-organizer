import {
  playerTournamentScores,
  playerTournamentScore,
  createPlayerTournamentScore,
  updatePlayerTournamentScore,
  deletePlayerTournamentScore,
} from './playerTournamentScores'

describe('playerTournamentScores', () => {
  scenario('returns all playerTournamentScores', async (scenario) => {
    const result = await playerTournamentScores()

    expect(result.length).toEqual(
      Object.keys(scenario.playerTournamentScore).length
    )
  })

  scenario('returns a single playerTournamentScore', async (scenario) => {
    const result = await playerTournamentScore({
      id: scenario.playerTournamentScore.one.id,
    })

    expect(result).toEqual(scenario.playerTournamentScore.one)
  })

  scenario('creates a playerTournamentScore', async (scenario) => {
    const result = await createPlayerTournamentScore({
      input: {
        playerId: scenario.playerTournamentScore.two.playerId,
        tournamentId: scenario.playerTournamentScore.two.tournamentId,
      },
    })

    expect(result.playerId).toEqual(scenario.playerTournamentScore.two.playerId)

    expect(result.tournamentId).toEqual(
      scenario.playerTournamentScore.two.tournamentId
    )
  })

  scenario('updates a playerTournamentScore', async (scenario) => {
    const original = await playerTournamentScore({
      id: scenario.playerTournamentScore.one.id,
    })

    const result = await updatePlayerTournamentScore({
      id: original.id,
      input: { playerId: scenario.playerTournamentScore.two.playerId },
    })

    expect(result.playerId).toEqual(scenario.playerTournamentScore.two.playerId)
  })

  scenario('deletes a playerTournamentScore', async (scenario) => {
    const original = await deletePlayerTournamentScore({
      id: scenario.playerTournamentScore.one.id,
    })

    const result = await playerTournamentScore({ id: original.id })

    expect(result).toEqual(null)
  })
})
