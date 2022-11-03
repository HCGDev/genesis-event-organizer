import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes } from '@redwoodjs/router'

import { QUERY } from 'src/components/RoundsCell'

const DELETE_ROUND_MUTATION = gql`
  mutation DeleteRoundMutation($id: Int!) {
    deleteRound(id: $id) {
      id
    }
  }
`

const MAX_STRING_LENGTH = 150

const truncate = (text) => {
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

const jsonTruncate = (obj) => {
  return truncate(JSON.stringify(obj, null, 2))
}

const timeTag = (datetime) => {
  return (
    <time dateTime={datetime} title={datetime}>
      {new Date(datetime).toUTCString()}
    </time>
  )
}

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}

const RoundsList = ({ rounds }) => {
  const [deleteRound] = useMutation(DELETE_ROUND_MUTATION, {
    onCompleted: () => {
      toast.success('Round deleted')
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete round ' + id + '?')) {
      deleteRound({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>Tournament id</th>
            <th>Round number</th>
            <th>Active</th>
            <th>Starting timer in seconds</th>
            <th>Round timer left in seconds</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {rounds.map((round) => (
            <tr key={round.id}>
              <td>{truncate(round.id)}</td>
              <td>{timeTag(round.createdAt)}</td>
              <td>{timeTag(round.updatedAt)}</td>
              <td>{truncate(round.tournamentId)}</td>
              <td>{truncate(round.roundNumber)}</td>
              <td>{checkboxInputTag(round.active)}</td>
              <td>{truncate(round.startingTimerInSeconds)}</td>
              <td>{truncate(round.roundTimerLeftInSeconds)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.round({ id: round.id })}
                    title={'Show round ' + round.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editRound({ id: round.id })}
                    title={'Edit round ' + round.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <a
                    href="#"
                    title={'Delete round ' + round.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(round.id)}
                  >
                    Delete
                  </a>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default RoundsList
