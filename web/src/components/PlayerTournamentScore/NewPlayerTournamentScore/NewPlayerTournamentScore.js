import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import PlayerTournamentScoreForm from 'src/components/PlayerTournamentScore/PlayerTournamentScoreForm'

const CREATE_PLAYER_TOURNAMENT_SCORE_MUTATION = gql`
  mutation CreatePlayerTournamentScoreMutation(
    $input: CreatePlayerTournamentScoreInput!
  ) {
    createPlayerTournamentScore(input: $input) {
      id
    }
  }
`

const NewPlayerTournamentScore = () => {
  const [createPlayerTournamentScore, { loading, error }] = useMutation(
    CREATE_PLAYER_TOURNAMENT_SCORE_MUTATION,
    {
      onCompleted: () => {
        toast.success('PlayerTournamentScore created')
        navigate(routes.playerTournamentScores())
      },
    }
  )

  const onSave = (input) => {
    const castInput = Object.assign(input, {
      tournamentId: parseInt(input.tournamentId),
    })
    createPlayerTournamentScore({ variables: { input: castInput } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          New PlayerTournamentScore
        </h2>
      </header>
      <div className="rw-segment-main">
        <PlayerTournamentScoreForm
          onSave={onSave}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  )
}

export default NewPlayerTournamentScore
