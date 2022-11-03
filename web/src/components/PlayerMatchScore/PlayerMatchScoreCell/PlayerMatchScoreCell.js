import PlayerMatchScore from 'src/components/PlayerMatchScore/PlayerMatchScore'

export const QUERY = gql`
  query FindPlayerMatchScoreById($id: Int!) {
    playerMatchScore: playerMatchScore(id: $id) {
      id
      score
      userId
      matchId
      createdAt
      updatedAt
      wonMatch
      bye
      active
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>PlayerMatchScore not found</div>

export const Success = ({ playerMatchScore }) => {
  return <PlayerMatchScore playerMatchScore={playerMatchScore} />
}
