export const schema = gql`
  type Match {
    id: Int!
    roundId: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    tournamentId: Int!
    active: Boolean!
    round: Round!
    tournament: Tournament!
    players: [PlayerMatchScore]!
  }

  type Query {
    matches: [Match!]! @adminOnly
    match(id: Int!): Match @adminOnly
  }

  input CreateMatchInput {
    roundId: Int!
    tournamentId: Int!
    active: Boolean!
  }

  input UpdateMatchInput {
    roundId: Int
    tournamentId: Int
    active: Boolean
  }

  type Mutation {
    createMatch(input: CreateMatchInput!): Match! @adminOnly
    updateMatch(id: Int!, input: UpdateMatchInput!): Match! @adminOnly
    deleteMatch(id: Int!): Match! @adminOnly
  }
`
