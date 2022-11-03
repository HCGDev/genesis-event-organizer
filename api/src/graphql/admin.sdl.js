export const schema = gql`
  type Mutation {
    seedSingleTournament(id: Int!, numPlayers: Int): Tournament @adminOnly
    seedTournaments(country: String, numTournaments: Int): [Tournament]!
      @adminOnly
  }
`
