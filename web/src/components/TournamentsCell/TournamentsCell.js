import { Link, routes } from '@redwoodjs/router'

import Tournaments from 'src/components/Tournaments'

export const beforeQuery = (props) => {
  return { variables: props }
}

export const QUERY = gql`
  query ($searchTerm: String, $orderBy: OrderByInput) {
    tournaments(searchTerm: $searchTerm, orderBy: $orderBy) {
      id
      name
      tournamentUrl
      startDate
      dateStarted
      dateEnded
      maxPlayers
      locationName
      infoUrl
      street1
      street2
      city
      country
      state
      zip
      lat
      lng
      storeId
      ownerId
      createdAt
      updatedAt
      userId
      desc
      type
      active
      startingTimerInSeconds
      timerLeftInSeconds
      timerStatus
      timerLastUpdated
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No tournaments yet. '}
      <Link to={routes.newTournament()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Success = (props) => {
  return <Tournaments {...props} />
}
