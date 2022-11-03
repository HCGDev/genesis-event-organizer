export const schema = gql`
  type Round {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    tournamentId: Int!
    roundNumber: Int!
    active: Boolean!
    isTieBreakerRound: Boolean
    startingTimerInSeconds: Int
    roundTimerLeftInSeconds: Int
    tournament: Tournament!
    matches: [Match]!
  }

  type Query {
    rounds: [Round!]! @adminOnly
    round(id: Int!): Round @adminOnly
  }

  input CreateRoundInput {
    tournamentId: Int!
    roundNumber: Int!
    active: Boolean!
    startingTimerInSeconds: Int
    roundTimerLeftInSeconds: Int
  }

  input UpdateRoundInput {
    tournamentId: Int
    roundNumber: Int
    active: Boolean
    startingTimerInSeconds: Int
    roundTimerLeftInSeconds: Int
  }

  type Mutation {
    createRound(input: CreateRoundInput!): Round! @adminOnly
    updateRound(id: Int!, input: UpdateRoundInput!): Round! @adminOnly
    deleteRound(id: Int!): Round! @adminOnly
  }
`
