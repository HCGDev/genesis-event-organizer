import { Link, routes } from '@redwoodjs/router'

import PlayerMatchScores from 'src/components/PlayerMatchScore/PlayerMatchScores'

export const QUERY = gql`
  query PLAYER_MATCH_SCORES {
    playerMatchScores {
      id
      score
      userId
      matchId
      createdAt
      updatedAt
      wonMatch
      playerName
      bye
      active
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No playerMatchScores yet. '}
      <Link to={routes.newPlayerMatchScore()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Success = ({ playerMatchScores }) => {
  return <PlayerMatchScores playerMatchScores={playerMatchScores} />
}
