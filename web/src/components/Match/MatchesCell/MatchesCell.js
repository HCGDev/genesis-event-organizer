import { Link, routes } from '@redwoodjs/router'

import Matches from 'src/components/Match/Matches'

export const QUERY = gql`
  query MATCHES {
    matches {
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

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No matches yet. '}
      <Link to={routes.newMatch()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Success = ({ matches }) => {
  return <Matches matches={matches} />
}
