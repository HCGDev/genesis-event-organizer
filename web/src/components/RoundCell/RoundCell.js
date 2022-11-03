import Round from 'src/components/Round'

export const QUERY = gql`
  query FIND_ROUND_BY_ID($id: Int!) {
    round: round(id: $id) {
      id
      createdAt
      updatedAt
      tournamentId
      roundNumber
      active
      startingTimerInSeconds
      roundTimerLeftInSeconds
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Round not found</div>

export const Success = ({ round }) => {
  return <Round round={round} />
}
