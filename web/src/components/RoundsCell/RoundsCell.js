import { Link, routes } from '@redwoodjs/router'

import Rounds from 'src/components/Rounds'

export const QUERY = gql`
  query ROUNDS {
    rounds {
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

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No rounds yet. '}
      <Link to={routes.newRound()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Success = ({ rounds }) => {
  return <Rounds rounds={rounds} />
}
