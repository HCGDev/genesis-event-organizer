import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import PlayerMatchScoreForm from 'src/components/PlayerMatchScore/PlayerMatchScoreForm'

const CREATE_PLAYER_MATCH_SCORE_MUTATION = gql`
  mutation CreatePlayerMatchScoreMutation(
    $input: CreatePlayerMatchScoreInput!
  ) {
    createPlayerMatchScore(input: $input) {
      id
    }
  }
`

const NewPlayerMatchScore = () => {
  const [createPlayerMatchScore, { loading, error }] = useMutation(
    CREATE_PLAYER_MATCH_SCORE_MUTATION,
    {
      onCompleted: () => {
        toast.success('PlayerMatchScore created')
        navigate(routes.playerMatchScores())
      },
    }
  )

  const onSave = (input) => {
    const castInput = Object.assign(input, { matchId: parseInt(input.matchId) })
    createPlayerMatchScore({ variables: { input: castInput } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          New PlayerMatchScore
        </h2>
      </header>
      <div className="rw-segment-main">
        <PlayerMatchScoreForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewPlayerMatchScore
