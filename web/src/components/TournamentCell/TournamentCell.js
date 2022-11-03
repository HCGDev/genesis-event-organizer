import Tournament from 'src/components/Tournament'

export const QUERY = gql`
  query FIND_TOURNAMENT_BY_ID($id: Int!) {
    tournament: tournament(id: $id) {
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
      owner {
        id
        firstname
        lastname
        gender
        phone
        city
        state
        country
        zip
        createdAt
        updatedAt
        howHeard
        flags
        adminComments
        disabled
        disabledOn
        nickname
        userPictureId
        disabledBy
        email
        dob
        active
      }
      players {
        id
        wins
        losses
        score
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
      store {
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
        approved
        approvedOn
        owner {
          nickname
          email
        }
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Tournament not found</div>

export const Success = ({ tournament }) => {
  return <Tournament tournament={tournament} />
}
