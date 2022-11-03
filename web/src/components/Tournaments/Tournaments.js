import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'

import { QUERY } from 'src/components/TournamentsCell'
import Table, { COLUMN_TYPE } from '../Table/Table'

const DELETE_TOURNAMENT_MUTATION = gql`
  mutation DeleteTournamentMutation($id: Int!) {
    deleteTournament(id: $id) {
      id
    }
  }
`

const TournamentsList = ({ tournaments, orderBy, setOrderBy, searchTerm }) => {
  const [deleteTournament] = useMutation(DELETE_TOURNAMENT_MUTATION, {
    onCompleted: () => {
      toast.success('Tournament deleted')
    },
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete tournament ' + id + '?')) {
      deleteTournament({ variables: { id } })
    }
  }

  return (
    <div>
      <div className="my-1 flex flex-col justify-around text-center">
        <div>{tournaments.length} Total Tournaments</div>
        <div>
          {tournaments.filter((tournament) => tournament.active).length} Total
          Active Tournaments
        </div>
      </div>
      <Table
        sort={orderBy}
        onSort={setOrderBy}
        columns={[
          {
            name: 'Id',
            key: 'id',
            type: COLUMN_TYPE.TEXT,
          },
          {
            name: 'Name',
            key: 'name',
            type: COLUMN_TYPE.TEXT,
          },
          {
            name: 'Tournament Url',
            key: 'tournamentUrlr',
            type: COLUMN_TYPE.TEXT,
          },
          {
            name: 'Start Date',
            key: 'startDate',
            type: COLUMN_TYPE.DATE,
          },
          {
            name: 'Type',
            key: 'type',
            type: COLUMN_TYPE.TEXT,
          },
          {
            name: 'Date started',
            key: 'dateStarted',
            type: COLUMN_TYPE.DATE,
          },
          {
            name: 'Date ended',
            key: 'dateEnded',
            type: COLUMN_TYPE.DATE,
          },
          {
            name: 'Max players',
            key: 'maxPlayers',
            type: COLUMN_TYPE.TEXT,
          },
          {
            name: 'Location name',
            key: 'locationName',
            type: COLUMN_TYPE.TEXT,
          },
          {
            name: 'Info url',
            key: 'infoUrl',
            type: COLUMN_TYPE.TEXT,
          },
          {
            name: 'Street1',
            key: 'street1',
            type: COLUMN_TYPE.TEXT,
          },
          {
            name: 'Street2',
            key: 'street2',
            type: COLUMN_TYPE.TEXT,
          },
          {
            name: 'City',
            key: 'city',
            type: COLUMN_TYPE.TEXT,
          },
          {
            name: 'Country',
            key: 'country',
            type: COLUMN_TYPE.TEXT,
          },
          {
            name: 'State/Province',
            key: 'state',
            type: COLUMN_TYPE.TEXT,
          },
          {
            name: 'Zip',
            key: 'zip',
            type: COLUMN_TYPE.TEXT,
          },
          {
            name: 'Lat',
            key: 'lat',
            type: COLUMN_TYPE.TEXT,
          },
          {
            name: 'Lng',
            key: 'lng',
            type: COLUMN_TYPE.TEXT,
          },
          {
            name: 'Store id',
            key: 'storeId',
            type: COLUMN_TYPE.TEXT,
          },
          {
            name: 'Owner id',
            key: 'ownerId',
            type: COLUMN_TYPE.TEXT,
          },
          {
            name: 'Created at',
            key: 'createdAt',
            type: COLUMN_TYPE.DATE,
          },
          {
            name: 'Updated at',
            key: 'updatedAt',
            type: COLUMN_TYPE.DATE,
          },
          {
            name: 'Desc',
            key: 'desc',
            type: COLUMN_TYPE.TEXT,
          },
          {
            name: 'Active',
            key: 'active',
            type: COLUMN_TYPE.CHECKBOX,
          },
          {
            name: 'Starting timer in seconds',
            key: 'startingTimerInSeconds',
            type: COLUMN_TYPE.TEXT,
          },
          {
            name: 'Timer left in seconds',
            key: 'timerLeftInSeconds',
            type: COLUMN_TYPE.TEXT,
          },
          {
            name: 'Timer status',
            key: 'timerStatus',
            type: COLUMN_TYPE.TEXT,
          },
          {
            name: 'Timer last update',
            key: 'timerLastUpdated',
            type: COLUMN_TYPE.DATE,
          },
        ]}
        actions={[
          {
            text: 'Show',
            action: (id) => navigate(routes.tournament({ id })),
            linkKey: 'id',
          },
          {
            text: 'Edit',
            action: (id) => navigate(routes.editTournament({ id })),
          },
          {
            text: 'Delete',
            action: (id) => onDeleteClick(id),
            colour: 'red',
          },
        ]}
        dataObj={tournaments}
      />
    </div>
  )
}

export default TournamentsList
