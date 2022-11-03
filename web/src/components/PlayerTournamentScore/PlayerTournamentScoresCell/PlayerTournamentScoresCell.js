import { Link, routes } from '@redwoodjs/router'

import PlayerTournamentScores from 'src/components/PlayerTournamentScore/PlayerTournamentScores'

export const QUERY = gql`
  query PLAYER_TOURNAMENT_SCORES {
    playerTournamentScores {
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
      player {
        nickname
      }
      tournament {
        name
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No playerTournamentScores yet. '}
      <Link to={routes.newPlayerTournamentScore()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Success = ({ playerTournamentScores }) => {
  return (
    <PlayerTournamentScores playerTournamentScores={playerTournamentScores} />
  )
}
