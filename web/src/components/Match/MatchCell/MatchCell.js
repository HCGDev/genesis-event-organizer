import Match from 'src/components/Match/Match'

export const QUERY = gql`
  query FindMatchById($id: Int!) {
    match: match(id: $id) {
      id
      roundId
      createdAt
      updatedAt
      tournamentId
      active
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Match not found</div>

export const Success = ({ match }) => {
  return <Match match={match} />
}
