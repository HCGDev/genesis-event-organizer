import Store from 'src/components/Store'

export const FIND_STORE_BY_ID = gql`
  query FIND_STORE_BY_ID($id: String!) {
    store: store(id: $id) {
      id
      name
      ownerId
      email
      phone
      lat
      lng
      street1
      street2
      city
      country
      state
      zip
      distributor
      placeId
      hidden
      approved
      approvedOn
      owner {
        email
        nickname
      }
      tournaments {
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
        active
        startingTimerInSeconds
        timerLeftInSeconds
        timerStatus
        timerLastUpdated
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Store not found</div>

export const Success = ({ store }) => {
  return <Store store={store} />
}
