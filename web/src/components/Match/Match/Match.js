import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes, navigate } from '@redwoodjs/router'

const DELETE_MATCH_MUTATION = gql`
  mutation DeleteMatchMutation($id: Int!) {
    deleteMatch(id: $id) {
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

const Match = ({ match }) => {
  const [deleteMatch] = useMutation(DELETE_MATCH_MUTATION, {
    onCompleted: () => {
      toast.success('Match deleted')
      navigate(routes.matches())
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete match ' + id + '?')) {
      deleteMatch({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Match {match.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{match.id}</td>
            </tr>
            <tr>
              <th>Round id</th>
              <td>{match.roundId}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(match.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(match.updatedAt)}</td>
            </tr>
            <tr>
              <th>Tournament id</th>
              <td>{match.tournamentId}</td>
            </tr>
            <tr>
              <th>Active</th>
              <td>{checkboxInputTag(match.active)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editMatch({ id: match.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <a
          href="#"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(match.id)}
        >
          Delete
        </a>
      </nav>
    </>
  )
}

export default Match
