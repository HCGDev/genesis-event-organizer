import { composeMatchArrays, findOpponent } from './tournamentHelpers'

const returnPlayer = ({
  name,
  wins = 0,
  score = 0,
  byes = 0,
  losses = 0,
  draws = 0,
}) => {
  return {
    id: name,
    playerName: name,
    playerId: name,
    wins,
    draws,
    score,
    byes,
    losses,
  }
}

const checkNoRematch = ({ oldMatches = [], newMatches = [] }) => {
  //Make object of which players have played in old matches
  let playersPlayed = {}
  let anyRematch = true

  oldMatches.forEach((match) => {
    let player1 = match.players[0].id
    let player2 = match.players[1]?.id

    if (!(player1 in playersPlayed)) {
      playersPlayed[player1] = []
    }

    if (!(player2 in playersPlayed)) {
      playersPlayed[player2] = []
    }

    playersPlayed[player1].push(player2)
    playersPlayed[player2].push(player1)
  })

  newMatches.forEach((match) => {
    let player1 = match[0]
    let player2 = match[1]

    if (
      playersPlayed[player1].indexOf(player2) !== -1 ||
      playersPlayed[player2]?.indexOf(player1) !== -1
    ) {
      anyRematch = false
    }
  })

  return anyRematch
}

const checkCorrectScoreDifferential = ({ players = [], matches = [] }) => {
  let matchScoreDifferent = false
  let scoreObj = {}
  let playerScores = {}

  //Make score diff for each player
  players.forEach((player) => {
    let scoreDiff = player.wins - player.losses + 0.5 * player.draws
    if (scoreDiff in scoreObj) {
      scoreObj[scoreDiff].push(player.id)
    } else {
      scoreObj[scoreDiff] = [player.id]
    }
    playerScores[player.id] = scoreDiff
  })

  matches.forEach((match) => {
    let player1 = match[0]
    let player2 = match[1]

    if (playerScores[player1] !== playerScores[player2]) {
      matchScoreDifferent = true
    }
  })

  return matchScoreDifferent
}

describe('Matching Algorithm', () => {
  it('Correctly returns matches for beginning matches', () => {
    let matches = composeMatchArrays({
      players: [
        returnPlayer({ name: 'player1' }),
        returnPlayer({ name: 'player2' }),
        returnPlayer({ name: 'player3' }),
        returnPlayer({ name: 'player4' }),
      ],
      matches: [],
    })

    expect(matches.length).toBe(2)
  })

  it('Correctly returns matches for the 1st round', () => {
    let players = [
      returnPlayer({ name: 'player1', score: 1, wins: 1, losses: 0 }),
      returnPlayer({ name: 'player2', score: 0, wins: 0, losses: 1 }),
      returnPlayer({ name: 'player3', score: 1, wins: 1, losses: 0 }),
      returnPlayer({ name: 'player4', score: 0, wins: 0, losses: 1 }),
    ]

    let matches = [
      {
        players: [players[0], players[1]],
      },
      {
        players: [players[2], players[3]],
      },
    ]
    let composedMatches = composeMatchArrays({
      players,
      matches,
    })

    expect(
      checkNoRematch({ oldMatches: matches, newMatches: composedMatches })
    ).toBe(true)
  })

  it('Correctly returns number of matches for high number of players', () => {
    let players = [
      returnPlayer({ name: 'player1', score: 0, wins: 0, losses: 0 }),
      returnPlayer({ name: 'player2', score: 0, wins: 0, losses: 0 }),
      returnPlayer({ name: 'player3', score: 0, wins: 0, losses: 0 }),
      returnPlayer({ name: 'player4', score: 0, wins: 0, losses: 0 }),
      returnPlayer({ name: 'player5', score: 0, wins: 0, losses: 0 }),
      returnPlayer({ name: 'player6', score: 0, wins: 0, losses: 0 }),
      returnPlayer({ name: 'player7', score: 0, wins: 0, losses: 0 }),
      returnPlayer({ name: 'player8', score: 0, wins: 0, losses: 0 }),
      returnPlayer({ name: 'player9', score: 0, wins: 0, losses: 0 }),
      returnPlayer({ name: 'player10', score: 0, wins: 0, losses: 0 }),
      returnPlayer({ name: 'player11', score: 0, wins: 0, losses: 0 }),
      returnPlayer({ name: 'player12', score: 0, wins: 0, losses: 0 }),
    ]

    let matches = []
    let composedMatches = composeMatchArrays({
      players,
      matches,
    })

    let scoreDifferent = checkCorrectScoreDifferential({ players, matches })

    expect(composedMatches.length).toBe(6)
    expect(scoreDifferent).toBe(false)
  })

  it('Correctly returns matches for high number of players', () => {
    let players = [
      returnPlayer({ name: 'player1', score: 1, wins: 1, losses: 0 }),
      returnPlayer({ name: 'player2', score: 0, wins: 0, losses: 1 }),
      returnPlayer({ name: 'player3', score: 1, wins: 1, losses: 0 }),
      returnPlayer({ name: 'player4', score: 0, wins: 0, losses: 1 }),
      returnPlayer({ name: 'player5', score: 1, wins: 1, losses: 0 }),
      returnPlayer({ name: 'player6', score: 0, wins: 0, losses: 1 }),
      returnPlayer({ name: 'player7', score: 1, wins: 1, losses: 0 }),
      returnPlayer({ name: 'player8', score: 0, wins: 0, losses: 1 }),
      returnPlayer({ name: 'player9', score: 1, wins: 1, losses: 0 }),
      returnPlayer({ name: 'player10', score: 0, wins: 0, losses: 1 }),
      returnPlayer({ name: 'player11', score: 1, wins: 1, losses: 0 }),
      returnPlayer({ name: 'player12', score: 0, wins: 0, losses: 1 }),
    ]

    let matches = [
      {
        players: [players[0], players[1]],
      },
      {
        players: [players[2], players[3]],
      },
      {
        players: [players[4], players[5]],
      },
      {
        players: [players[6], players[7]],
      },
      {
        players: [players[8], players[9]],
      },
      {
        players: [players[10], players[11]],
      },
    ]

    let composedMatches = composeMatchArrays({
      players,
      matches,
    })

    let scoreDifferent = checkCorrectScoreDifferential({ players, matches })
    expect(scoreDifferent).toBe(false)

    expect(
      checkNoRematch({ oldMatches: matches, newMatches: composedMatches })
    ).toBe(true)
  })

  it('Correctly ensures no replays for 2nd round high number of players on a high number of tries', () => {
    let players = [
      returnPlayer({ name: 'player1', score: 1, wins: 1, losses: 0 }),
      returnPlayer({ name: 'player2', score: 0, wins: 0, losses: 1 }),
      returnPlayer({ name: 'player3', score: 1, wins: 1, losses: 0 }),
      returnPlayer({ name: 'player4', score: 0, wins: 0, losses: 1 }),
      returnPlayer({ name: 'player5', score: 1, wins: 1, losses: 0 }),
      returnPlayer({ name: 'player6', score: 0, wins: 0, losses: 1 }),
      returnPlayer({ name: 'player7', score: 1, wins: 1, losses: 0 }),
      returnPlayer({ name: 'player8', score: 0, wins: 0, losses: 1 }),
      returnPlayer({ name: 'player9', score: 1, wins: 1, losses: 0 }),
      returnPlayer({ name: 'player10', score: 0, wins: 0, losses: 1 }),
      returnPlayer({ name: 'player11', score: 1, wins: 1, losses: 0 }),
      returnPlayer({ name: 'player12', score: 0, wins: 0, losses: 1 }),
    ]

    let matches = [
      {
        players: [players[0], players[1]],
      },
      {
        players: [players[2], players[3]],
      },
      {
        players: [players[4], players[5]],
      },
      {
        players: [players[6], players[7]],
      },
      {
        players: [players[8], players[9]],
      },
      {
        players: [players[10], players[11]],
      },
    ]

    //In 100 scenarios, ensure there is never an end result of a player playing against the same player twice in a row
    for (var i = 0; i < 100; i++) {
      let composedMatches = composeMatchArrays({
        players,
        matches,
      })

      expect(
        checkNoRematch({ oldMatches: matches, newMatches: composedMatches })
      ).toBe(true)
    }
  })

  it('Correctly ensures no replays for 3rd round high number of players on a high number of tries', () => {
    let players = [
      returnPlayer({ name: 'player1', score: 1, wins: 1, losses: 0 }),
      returnPlayer({ name: 'player2', score: 0, wins: 0, losses: 1 }),
      returnPlayer({ name: 'player3', score: 1, wins: 1, losses: 0 }),
      returnPlayer({ name: 'player4', score: 0, wins: 0, losses: 1 }),
      returnPlayer({ name: 'player5', score: 1, wins: 1, losses: 0 }),
      returnPlayer({ name: 'player6', score: 0, wins: 0, losses: 1 }),
      returnPlayer({ name: 'player7', score: 1, wins: 1, losses: 0 }),
      returnPlayer({ name: 'player8', score: 0, wins: 0, losses: 1 }),
      returnPlayer({ name: 'player9', score: 1, wins: 1, losses: 0 }),
      returnPlayer({ name: 'player10', score: 0, wins: 0, losses: 1 }),
      returnPlayer({ name: 'player11', score: 1, wins: 1, losses: 0 }),
      returnPlayer({ name: 'player12', score: 0, wins: 0, losses: 1 }),
    ]

    let matches = [
      {
        players: [players[0], players[1]],
      },
      {
        players: [players[2], players[3]],
      },
      {
        players: [players[4], players[5]],
      },
      {
        players: [players[6], players[7]],
      },
      {
        players: [players[8], players[9]],
      },
      {
        players: [players[10], players[11]],
      },
      {
        players: [players[0], players[9]],
      },
      {
        players: [players[1], players[6]],
      },
      {
        players: [players[2], players[5]],
      },
      {
        players: [players[3], players[7]],
      },
      {
        players: [players[4], players[10]],
      },
      {
        players: [players[8], players[11]],
      },
    ]

    //In 100 scenarios, ensure there is never an end result of a player playing against the same player twice in a row
    for (var i = 0; i < 100; i++) {
      let composedMatches = composeMatchArrays({
        players,
        matches,
      })

      expect(
        checkNoRematch({ oldMatches: matches, newMatches: composedMatches })
      ).toBe(true)
    }
  })

  it('Correctly has no rematches for an odd number of players', () => {
    let players = [
      returnPlayer({ name: 'player1', score: 1, wins: 1, losses: 0 }),
      returnPlayer({ name: 'player2', score: 0, wins: 0, losses: 1 }),
      returnPlayer({ name: 'player3', score: 1, wins: 0, losses: 0, byes: 1 }),
    ]

    let matches = [
      {
        players: [players[0], players[1]],
      },
      {
        players: [players[2]],
      },
    ]
    let composedMatches = composeMatchArrays({
      players,
      matches,
    })

    expect(
      checkNoRematch({ oldMatches: matches, newMatches: composedMatches })
    ).toBe(true)
  })

  it('Correctly expects a rematch with 2 players', () => {
    let players = [
      returnPlayer({ name: 'player1', score: 1, wins: 1, losses: 0 }),
      returnPlayer({ name: 'player2', score: 0, wins: 0, losses: 1 }),
    ]

    let matches = [
      {
        players: [players[0], players[1]],
      },
    ]

    let composedMatches = composeMatchArrays({
      players,
      matches,
    })

    expect(
      checkNoRematch({ oldMatches: matches, newMatches: composedMatches })
    ).toBe(false)
  })

  it('Correctly ensures no rematches for 6 players when there is a draw', () => {
    let players = [
      returnPlayer({ name: 'player1', score: 1, wins: 1, losses: 0 }),
      returnPlayer({ name: 'player2', score: 0, wins: 0, losses: 1 }),
      returnPlayer({ name: 'player3', score: 1, wins: 1, losses: 0 }),
      returnPlayer({ name: 'player4', score: 0, wins: 0, losses: 1 }),
      returnPlayer({
        name: 'player5',
        score: 0.5,
        wins: 0,
        losses: 0,
        draws: 1,
      }),
      returnPlayer({
        name: 'player6',
        score: 0.5,
        wins: 0,
        losses: 0,
        draws: 1,
      }),
    ]

    let matches = [
      {
        players: [players[0], players[1]],
      },
      {
        players: [players[2], players[3]],
      },
      {
        players: [players[4], players[5]],
      },
    ]

    //In 100 scenarios, ensure there is never an end result of a player playing against the same player twice in a row
    for (var i = 0; i < 100; i++) {
      let composedMatches = composeMatchArrays({
        players,
        matches,
        lastRoundMatches: matches,
      })

      expect(
        checkNoRematch({ oldMatches: matches, newMatches: composedMatches })
      ).toBe(true)
    }
  })

  it('Correctly ensures no rematches for 6 players when there is no draw', () => {
    let players = [
      returnPlayer({ name: 'player1', score: 1, wins: 1, losses: 0 }),
      returnPlayer({ name: 'player2', score: 1, wins: 1, losses: 0 }),
      returnPlayer({ name: 'player3', score: 1, wins: 1, losses: 0 }),
      returnPlayer({ name: 'player4', score: 0, wins: 0, losses: 1 }),
      returnPlayer({
        name: 'player5',
        score: 0,
        wins: 0,
        losses: 1,
        draws: 0,
      }),
      returnPlayer({
        name: 'player6',
        score: 0,
        wins: 0,
        losses: 1,
        draws: 0,
      }),
    ]

    let matches = [
      {
        players: [players[0], players[3]],
      },
      {
        players: [players[1], players[4]],
      },
      {
        players: [players[2], players[5]],
      },
    ]

    //In 100 scenarios, ensure there is never an end result of a player playing against the same player twice in a row
    for (var i = 0; i < 100; i++) {
      let composedMatches = composeMatchArrays({
        players,
        matches,
        lastRoundMatches: matches,
      })

      expect(
        checkNoRematch({ oldMatches: matches, newMatches: composedMatches })
      ).toBe(true)
    }
  })
})

describe('Finding Opponents', () => {
  it('Correctly finds the right opponent given only one other player', () => {
    let { opponent } = findOpponent({
      playersNotGivenMatches: ['player2'],
      playersPlayedAgainst: [],
      playersProhibited: [],
      playersToAvoid: [],
    })

    expect(opponent).toBe('player2')
  })

  it('Correctly finds the right opponent given only one other player, despite playing against them before', () => {
    let { opponent } = findOpponent({
      playersNotGivenMatches: ['player1', 'player2'],
      playersPlayedAgainst: ['player2'],
      playersProhibited: ['player1'],
      playersToAvoid: [],
    })

    expect(opponent).toBe('player2')
  })

  it('Correctly finds the right opponent when given other options from previously played player', () => {
    let { opponent } = findOpponent({
      playersNotGivenMatches: ['player1', 'player2', 'player3'],
      playersPlayedAgainst: ['player2'],
      playersProhibited: ['player1'],
      playersToAvoid: [],
    })

    expect(opponent).toBe('player3')
  })

  it('Correctly finds the right opponent in large list', () => {
    let { opponent } = findOpponent({
      playersNotGivenMatches: [
        'player1',
        'player2',
        'player3',
        'player4',
        'player5',
        'player6',
        'player7',
      ],
      playersPlayedAgainst: ['player2', 'player3'],
      playersProhibited: ['player1'],
      playersToAvoid: [],
    })

    expect(opponent).not.toBe('player2')
    expect(opponent).not.toBe('player3')
  })

  it('Correctly finds the right opponent in large list repeatedly', () => {
    for (var i = 0; i < 10; i++) {
      let { opponent } = findOpponent({
        playersNotGivenMatches: [
          'player1',
          'player2',
          'player3',
          'player4',
          'player5',
          'player6',
          'player7',
        ],
        playersPlayedAgainst: ['player2', 'player3'],
        playersProhibited: ['player1'],
        playersToAvoid: [],
      })

      expect(opponent).not.toBe('player2')
      expect(opponent).not.toBe('player3')
    }
  })
})
