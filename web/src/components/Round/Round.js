import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes, navigate } from '@redwoodjs/router'

import { QUERY } from 'src/components/RoundsCell'

const DELETE_ROUND_MUTATION = gql`
  mutation DeleteRoundMutation($id: Int!) {
    deleteRound(id: $id) {
      id
    }
  }
`

const jsonDisplay = (obj) => {
  return (
    <pre>
      <code>{JSON.stringify(obj, null, 2)}</code>
    </pre>
  )
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

const Round = ({ round }) => {
  const [deleteRound] = useMutation(DELETE_ROUND_MUTATION, {
    onCompleted: () => {
      toast.success('Round deleted')
      navigate(routes.rounds())
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete round ' + id + '?')) {
      deleteRound({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Round {round.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{round.id}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(round.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(round.updatedAt)}</td>
            </tr>
            <tr>
              <th>Tournament id</th>
              <td>{round.tournamentId}</td>
            </tr>
            <tr>
              <th>Round number</th>
              <td>{round.roundNumber}</td>
            </tr>
            <tr>
              <th>Active</th>
              <td>{checkboxInputTag(round.active)}</td>
            </tr>
            <tr>
              <th>Starting timer in seconds</th>
              <td>{round.startingTimerInSeconds}</td>
            </tr>
            <tr>
              <th>Round timer left in seconds</th>
              <td>{round.roundTimerLeftInSeconds}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editRound({ id: round.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <a
          href="#"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(round.id)}
        >
          Delete
        </a>
      </nav>
    </>
  )
}

export default Round
