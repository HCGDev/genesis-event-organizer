import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import TournamentForm from 'src/components/TournamentForm'

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
    }
  }
`
const UPDATE_TOURNAMENT_MUTATION = gql`
  mutation UpdateTournamentMutation($id: Int!, $input: UpdateTournamentInput!) {
    updateTournament(id: $id, input: $input) {
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
`

export const Loading = () => <div>Loading...</div>

export const Success = ({ tournament }) => {
  const [updateTournament, { loading, error }] = useMutation(
    UPDATE_TOURNAMENT_MUTATION,
    {
      onCompleted: () => {
        toast.success('Tournament updated')
        navigate(routes.tournaments())
      },
    }
  )

  const onSave = (input, id) => {
    updateTournament({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Tournament {tournament.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <TournamentForm
          tournament={tournament}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
