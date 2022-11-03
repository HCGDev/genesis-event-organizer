import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import PlayerMatchScoreForm from 'src/components/PlayerMatchScore/PlayerMatchScoreForm'

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
const UPDATE_PLAYER_MATCH_SCORE_MUTATION = gql`
  mutation UpdatePlayerMatchScoreMutation(
    $id: Int!
    $input: UpdatePlayerMatchScoreInput!
  ) {
    updatePlayerMatchScore(id: $id, input: $input) {
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

export const Success = ({ playerMatchScore }) => {
  const [updatePlayerMatchScore, { loading, error }] = useMutation(
    UPDATE_PLAYER_MATCH_SCORE_MUTATION,
    {
      onCompleted: () => {
        toast.success('PlayerMatchScore updated')
        navigate(routes.playerMatchScores())
      },
    }
  )

  const onSave = (input, id) => {
    const castInput = Object.assign(input, { matchId: parseInt(input.matchId) })
    updatePlayerMatchScore({ variables: { id, input: castInput } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit PlayerMatchScore {playerMatchScore.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <PlayerMatchScoreForm
          playerMatchScore={playerMatchScore}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
