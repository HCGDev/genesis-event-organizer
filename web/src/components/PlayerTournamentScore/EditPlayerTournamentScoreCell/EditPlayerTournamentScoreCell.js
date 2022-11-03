import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import PlayerTournamentScoreForm from 'src/components/PlayerTournamentScore/PlayerTournamentScoreForm'

export const QUERY = gql`
  query FindPlayerTournamentScoreById($id: Int!) {
    playerTournamentScore: playerTournamentScore(id: $id) {
      id
      wins
      losses
      score
      playerName
      playerId
      tournamentId
      createdAt
      updatedAt
      draws
      byes
      active
      wonTournament
    }
  }
`
const UPDATE_PLAYER_TOURNAMENT_SCORE_MUTATION = gql`
  mutation UpdatePlayerTournamentScoreMutation(
    $id: Int!
    $input: UpdatePlayerTournamentScoreInput!
  ) {
    updatePlayerTournamentScore(id: $id, input: $input) {
      id
      wins
      losses
      score
      playerName
      playerId
      tournamentId
      createdAt
      updatedAt
      draws
      byes
      active
      wonTournament
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Success = ({ playerTournamentScore }) => {
  const [updatePlayerTournamentScore, { loading, error }] = useMutation(
    UPDATE_PLAYER_TOURNAMENT_SCORE_MUTATION,
    {
      onCompleted: () => {
        toast.success('PlayerTournamentScore updated')
        navigate(routes.playerTournamentScores())
      },
    }
  )

  const onSave = (input, id) => {
    const castInput = Object.assign(input, {
      tournamentId: parseInt(input.tournamentId),
    })
    updatePlayerTournamentScore({ variables: { id, input: castInput } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit PlayerTournamentScore {playerTournamentScore.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <PlayerTournamentScoreForm
          playerTournamentScore={playerTournamentScore}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
