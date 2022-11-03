export const schema = gql`
  type Tournament {
    id: Int!
    name: String!
    desc: String
    type: String
    tournamentUrl: String!
    distance: Float
    playerCount: Int
    startDate: DateTime!
    dateStarted: DateTime
    dateEnded: DateTime
    maxPlayers: Int!
    locationName: String!
    publicRegistration: Boolean
    nextCutoffTournament: Tournament
    previousCutoffTournament: Tournament
    infoUrl: String
    street1: String
    street2: String
    city: String
    country: String
    state: String
    zip: String
    lat: Float
    lng: Float
    userId: String
    startingTimerInSeconds: Int
    timerLeftInSeconds: Int
    timerStatus: TimerStatus
    timerLastUpdated: DateTime
    storeId: String
    ownerId: String
    createdAt: DateTime!
    updatedAt: DateTime!
    owner: User
    store: Store
    user: User
    matches: [Match]!
    # Players is a sorted leaderboard with tiebreaker resolution, playersList is just the straight playersList
    players: [PlayerTournamentScore]!
    playerList: [PlayerTournamentScore]
    winners: [PlayerTournamentScore]
    round: [Round]!
    active: Boolean!
  }

  fragment CoreTournamentFields on Tournament {
    id
    name
    tournamentUrl
    type
    startDate
    dateStarted
    dateEnded
    maxPlayers
    playerList {
      active
      playerId
    }
    store {
      name
      street1
    }
    winners {
      playerName
      player {
        nickname
      }
    }
    locationName
    lat
    lng
    street1
    street2
    city
    country
    state
    zip
  }

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
    timerLeftInSeconds
    timerStatus
    startingTimerInSeconds
    timerLastUpdated
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
      name
      email
    }
    players {
      id
      score
      wins
      byes
      draws
      losses
      active
      playerName
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

  enum TimerStatus {
    PENDING
    INPROGRESS
    PAUSED
    STOPPED
  }

  input OrderByInput {
    orderByKey: String
    orderByDirection: String
  }

  type Query {
    tournaments(searchTerm: String, orderBy: OrderByInput): [Tournament!]!
      @adminOnly
    searchTournaments(input: SearchTournamentInput!): PaginatedTournaments!
      @skipAuth
    tournament(id: Int!): Tournament @adminOnly
    tournamentByUrl(url: String): Tournament @skipAuth
    tournamentLeaderboardWithoutTies(url: String): [PlayerTournamentScore!]
      @adminOnly
    myTournaments: [Tournament!]! @skipAuth
    currentTournaments(input: SearchTournamentInput): [Tournament!]! @skipAuth
    upcomingTournaments(input: SearchTournamentInput): [Tournament!]! @skipAuth
    finishedTournaments(input: SearchTournamentInput): [Tournament!]! @skipAuth
    searchNonPlayers(id: Int!, searchTerm: String): [User!]! @requireAuth
  }

  input CreateTournamentInput {
    name: String!
    tournamentUrl: String
    startDate: DateTime!
    dateStarted: DateTime
    dateEnded: DateTime
    maxPlayers: Int!
    locationName: String!
    publicRegistration: Boolean
    infoUrl: String
    street1: String
    street2: String
    city: String
    country: String
    state: String
    zip: String
    lat: Float
    lng: Float
    storeId: String
    ownerId: String
    userId: String
    desc: String
    type: String
    active: Boolean
    startingTimerInSeconds: Int
    timerLeftInSeconds: Int
    timerStatus: TimerStatus
    timerLastUpdated: DateTime
  }

  input UpdateTournamentInput {
    name: String
    tournamentUrl: String
    startDate: DateTime
    dateStarted: DateTime
    dateEnded: DateTime
    maxPlayers: Int
    publicRegistration: Boolean
    locationName: String
    infoUrl: String
    street1: String
    street2: String
    city: String
    country: String
    state: String
    zip: String
    lat: Float
    lng: Float
    storeId: String
    ownerId: String
    userId: String
    desc: String
    type: String
    active: Boolean
    startingTimerInSeconds: Int
    timerLeftInSeconds: Int
    timerStatus: TimerStatus
    timerLastUpdated: DateTime
  }

  input TournamentMatchScoreInput {
    matchId: Int!
    matches: [MatchScore]!
  }

  input MatchScore {
    userId: String
    updatedUserId: String
    playerName: String
    updatedPlayerName: String
    playerMatchScoreId: Int
    previousBye: Boolean
    score: Int
    result: MatchResult
  }

  enum MatchResult {
    WIN
    TIED
    LOSS
  }

  input TimerInput {
    tournamentId: Int!
    timerLeftInSeconds: Int
    timerStatus: TimerStatus!
    startingTimerInSeconds: Int
  }

  input SearchTournamentInput {
    take: Int
    skip: Int
    name: String
    location: String
    lat: Float
    lng: Float
    country: String
    state: String
    city: String
    openSpotsOnly: Boolean
    finishedTournaments: Boolean
    type: String
    store: String
    dateStart: Date
    dateEnd: Date
    distance: Int
  }

  type PaginatedTournaments {
    more: Boolean
    totalCount: Int
    tournaments: [Tournament!]!
  }

  input AddPlayerInput {
    playerName: String!
    playerId: String
    wins: Int
    losses: Int
    byes: Int
    draws: Int
    score: Float
  }

  input CreateTournamentMatchInput {
    tournamentId: Int!
    roundId: Int!
    proposedMatch: [Int!]!
  }

  type Mutation {
    createTournament(input: CreateTournamentInput!): Tournament! @requireAuth
    updateTournament(id: Int!, input: UpdateTournamentInput!): Tournament!
      @requireAuth
    addPlayer(id: Int!, input: AddPlayerInput!): Tournament! @requireAuth
    deleteTournament(id: Int!): Tournament! @adminOnly
    registerForTournament(id: Int!): Tournament! @requireAuth
    startTournament(id: Int!): Tournament! @requireAuth
    updateTimer(input: TimerInput!): Tournament! @requireAuth
    deleteTournamentMatch(id: Int!): Tournament! @requireAuth
    createTournamentMatch(input: CreateTournamentMatchInput!): Tournament!
      @requireAuth
    addMatchScore(input: TournamentMatchScoreInput!): Tournament! @requireAuth
    updateMatchScore(input: TournamentMatchScoreInput!): Tournament!
      @requireAuth
    advanceRound(id: Int!, roundNumber: Int!): Tournament @requireAuth
    createTieBreakerRound(id: Int!): Tournament @requireAuth
    createCutoffTournament(id: Int!, cutOffRank: Int!): Tournament @requireAuth
    endTournament(id: Int!): Tournament! @requireAuth
    cancelTournament(id: Int!): Tournament! @requireAuth
    leaveTournament(id: Int!): String! @requireAuth
    removePlayer(id: Int!): String! @requireAuth
  }
`
