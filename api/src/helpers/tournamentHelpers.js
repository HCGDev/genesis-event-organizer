export const generateTournamentUrl = async (tournamentName, db) => {
  //Replace spaces in name with dashes
  let name = tournamentName.replaceAll(/[\W_]+/g, ' ')
  let url = name.trim().replaceAll(' ', '-')

  //Check if any other tournaments exist in the database with that URL
  let tournaments = await db.tournament.findMany({
    where: {
      OR: [{ tournamentUrl: url }, { tournamentUrl: { contains: `${url}-` } }],
    },
  })

  //Add a number to the end of the tournament name if it has a duplicate
  if (tournaments.length > 0) {
    url = url + `-${tournaments.length}`
  }

  //Return unique URL
  return url
}

export const generateMatches = async ({ roundNumber = 1, db, id }) => {
  //Given a tournament, generate the matches for the round
  const players = await db.tournament.findUnique({ where: { id } }).players({
    where: { active: true },
    orderBy: { wins: 'desc' },
  })

  let matches = []
  let lastRoundMatches = []

  if (roundNumber > 1) {
    matches = await db.tournament
      .findUnique({ where: { id } })
      .matches({ where: { active: true }, include: { players: true } })
  }

  if (roundNumber > 1) {
    lastRoundMatches = await db.round
      .findFirst({ where: { tournamentId: id, roundNumber: roundNumber - 1 } })
      .matches({ where: { active: true }, include: { players: true } })
  }

  return composeMatchArrays({ players, matches, lastRoundMatches, roundNumber })
}

export const composeMatchArrays = ({
  players = [],
  matches = [],
  lastRoundMatches = [],
  roundNumber = 1,
}) => {
  let matchArray = []
  let lastPlayed = {}
  lastRoundMatches.forEach((match) => {
    let player1 = findPlayer(match.players[0], players).id

    if (match.players.length > 1) {
      let player2 = findPlayer(match.players[1], players).id

      lastPlayed[player2] = player1
      lastPlayed[player1] = player2
    }
  })

  let numberOfRuns = 0
  let setReRun = true

  while (setReRun === true && numberOfRuns < 100) {
    matchArray = []
    setReRun = false
    numberOfRuns++

    let playersNotGivenMatches = players.map((player) => player.id)

    let playersGivenMatches = []
    let playerScores = {}

    let scoreObj = {}
    let playersPlayed = {}

    //Organize each user into a score differential
    players.forEach((player) => {
      let scoreDiff = player.wins - player.losses + 0.5 * player.draws
      if (scoreDiff in scoreObj) {
        scoreObj[scoreDiff].push(player.id)
      } else {
        scoreObj[scoreDiff] = [player.id]
      }
      playerScores[player.id] = scoreDiff
    })

    if (matches.length > 0) {
      //Go through all previous matches, find which players played which and add to the player dictionary
      matches.forEach((match) => {
        let player1 = findPlayer(match.players[0], players).id
        if (!(player1 in playersPlayed)) {
          playersPlayed[player1] = []
        }

        if (match.players.length > 1) {
          let player2 = findPlayer(match.players[1], players).id

          if (!(player2 in playersPlayed)) {
            playersPlayed[player2] = []
          }

          playersPlayed[player1] = [...playersPlayed[player1], player2]
          playersPlayed[player2] = [...playersPlayed[player2], player1]
        }
      })
    }

    //Sort the score differentials
    let scoreObjDiff = Object.keys(scoreObj)
    scoreObjDiff.sort((a, b) => parseInt(a) - parseInt(b)).reverse()

    let playerList = players.map((player) => player.id)

    //If odd number of players, given lowest
    if (playerList.length % 2 !== 0) {
      let playerGivenBye = null

      //Priority for byes: Players not given Byes, player with lowest score
      randomizedArray(players).forEach((player, index) => {
        if (index === 0) {
          playerGivenBye = player
        } else {
          if (
            player.byes <= playerGivenBye.byes &&
            player.score < playerGivenBye.score
          ) {
            playerGivenBye = player
          }
        }
      })

      matchArray.push([playerGivenBye.id])
      playersNotGivenMatches.splice(
        playersNotGivenMatches.indexOf(playerGivenBye.id),
        1
      )

      playersGivenMatches.push(playerGivenBye.id)
    }

    let sortedPlayerList = [...playerList]
    if (numberOfRuns > 1 || matches.length === 0) {
      sortedPlayerList = randomizedArray([...playerList])
    }

    sortedPlayerList.forEach((player) => {
      if (playersNotGivenMatches.indexOf(player) !== -1) {
        let match = []
        let scoreDifToCheck = playerScores[player]

        let playersToAvoid = []

        scoreObjDiff.forEach((key) => {
          //Players to avoid include players NOT with the same differential
          if (parseInt(scoreDifToCheck) !== parseInt(key)) {
            playersToAvoid = [
              ...playersToAvoid,
              randomizedArray([...scoreObj[key]]),
            ]
          }
        })

        let preferredPlayers = scoreObj[scoreDifToCheck]

        //Players that player cannot play against include players who have been given matches
        playersGivenMatches.push(player)

        //Setup match for player (even if alone)
        match.push(player)
        playersNotGivenMatches.splice(playersNotGivenMatches.indexOf(player), 1)
        let playersProhibited = [...playersGivenMatches]

        if (roundNumber > 1 && roundNumber < players.length) {
          playersProhibited = [...playersProhibited, ...playersPlayed[player]]
        } else if (
          playersNotGivenMatches.length > 2 &&
          lastRoundMatches.length > 0
        ) {
          playersProhibited = [...playersProhibited, lastPlayed[player]]
        }

        let { opponent, rerun } = findOpponent({
          preferredPlayers,
          playersNotGivenMatches,
          playersToAvoid,
          playersProhibited,
          playersPlayedAgainst:
            player in playersPlayed ? playersPlayed[player] : [],
        })

        if (playerList.length > 2 && setReRun === false) {
          setReRun = rerun
        }

        if (opponent) {
          match.push(opponent)
          playersGivenMatches.push(opponent)
          playersNotGivenMatches.splice(
            playersNotGivenMatches.indexOf(opponent),
            1
          )
        }

        matchArray.push(match)
      }
    })
  }

  return matchArray
}

export const findOpponent = ({
  preferredPlayers = [],
  playersNotGivenMatches = [],
  playersToAvoid = [],
  playersProhibited = [],
  playersPlayedAgainst = [],
}) => {
  let chosenOpponent = null
  let rerun = false

  //We will go through the playersNotGivenMatches and try to find a player that is not in the playersProhibited array and playersToAvoid array
  if (playersNotGivenMatches.length > 0) {
    //If player is in preferred list and not prohibited or to avoid, match them
    playersNotGivenMatches.forEach((possOpp) => {
      if (
        preferredPlayers.indexOf(possOpp) !== -1 &&
        playersProhibited.indexOf(possOpp) == -1 &&
        playersToAvoid.indexOf(possOpp) == -1 &&
        playersPlayedAgainst.indexOf(possOpp) === -1 &&
        !chosenOpponent
      ) {
        chosenOpponent = possOpp
      }
    })

    if (!chosenOpponent) {
      playersNotGivenMatches.forEach((possOpp) => {
        if (
          playersProhibited.indexOf(possOpp) == -1 &&
          playersToAvoid.indexOf(possOpp) == -1 &&
          playersPlayedAgainst.indexOf(possOpp) === -1 &&
          !chosenOpponent
        ) {
          chosenOpponent = possOpp
        }
      })
    }

    //If none is found, pick the top players from playersToAvoid that is not in playersProhibited AND  not in players played against
    if (!chosenOpponent) {
      playersNotGivenMatches.forEach((possOpp) => {
        if (
          playersProhibited.indexOf(possOpp) == -1 &&
          playersPlayedAgainst.indexOf(possOpp) === -1 &&
          !chosenOpponent
        ) {
          chosenOpponent = possOpp
        }
      })
    }

    //If  still no opponent found, just pick any player that is not prohibited
    if (!chosenOpponent) {
      playersNotGivenMatches.forEach((possOpp) => {
        if (playersProhibited.indexOf(possOpp) == -1 && !chosenOpponent) {
          chosenOpponent = possOpp
        }
      })
    }

    if (
      playersPlayedAgainst.indexOf(chosenOpponent) !== -1 ||
      (!chosenOpponent && playersNotGivenMatches.length > 0)
    ) {
      rerun = true
    }
  }

  //Return ChosenOpponent
  return { opponent: chosenOpponent, rerun }
}

const findPlayer = (player, players) => {
  //Given player with userId and playerName, find player in players array
  let playerFound = players.find(
    (playerObj) => player.userId && player.userId === playerObj.playerId
  )

  if (!playerFound) {
    playerFound = players.find(
      (playerObj) =>
        !player.playerId && player.playerName === playerObj.playerName
    )
  }

  return playerFound
}

const randomizedArray = (arr) =>
  arr
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)

export const calcNumRounds = (numPlayers, power = 1) => {
  if (2 ** power >= numPlayers) {
    return power
  } else {
    return calcNumRounds(numPlayers, power + 1)
  }
}
