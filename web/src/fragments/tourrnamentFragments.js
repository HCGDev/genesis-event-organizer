export const CORE_TOURNAMENT_FIELDS = gql`
  fragment CoreTournamentFields on Tournament {
    id
    name
    tournamentUrl
    locationName
    startDate
    dateStarted
    dateEnded
    desc
    maxPlayers
    playerList {
      active
      playerId
    }
    store {
      name
    }
    winners {
      playerId
      playerName
      player {
        nickname
      }
    }
    lat
    lng
    street1
    street2
    city
    country
    state
    zip
  }
`

export const VIEW_TOURNAMENT_FIELDS = gql`
  fragment ViewTournamentFields on Tournament {
    id
    tournamentUrl
    name
    desc
    type
    startDate
    dateStarted
    dateEnded
    maxPlayers
    publicRegistration
    nextCutoffTournament {
      id
      tournamentUrl
      name
    }
    previousCutoffTournament {
      id
      tournamentUrl
      name
    }
    timerLeftInSeconds
    timerStatus
    startingTimerInSeconds
    timerLastUpdated
    lat
    lng
    locationName
    street1
    city
    country
    state
    zip
    owner {
      nickname
      email
    }
    ownerId
    store {
      id
      name
      email
    }
    players {
      id
      rank
      score
      wins
      byes
      draws
      losses
      active
      playerName
      matchWinPercentage
      opponentsWinPercentage
      tournamentWinPercentage
      tieBreakerWins
      didCorrectRank
      player {
        id
        nickname
        photo {
          url
          smallUrl
          name
        }
      }
    }
    winners {
      id
      wonTournament
      playerName
      score
      wins
      byes
      draws
      losses
      player {
        id
        nickname
      }
    }
    round {
      id
      roundNumber
      roundTimerLeftInSeconds
      isTieBreakerRound
      matches {
        id
        players {
          id
          playerName
          score
          bye
          wonMatch
          userId
          user {
            id
            nickname
            photo {
              url
              smallUrl
              name
            }
          }
        }
        updatedAt
      }
      createdAt
    }
    active
  }
`
