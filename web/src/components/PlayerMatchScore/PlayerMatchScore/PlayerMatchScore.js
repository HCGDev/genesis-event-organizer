import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes, navigate } from '@redwoodjs/router'

const DELETE_PLAYER_MATCH_SCORE_MUTATION = gql`
  mutation DeletePlayerMatchScoreMutation($id: Int!) {
    deletePlayerMatchScore(id: $id) {
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

const PlayerMatchScore = ({ playerMatchScore }) => {
  const [deletePlayerMatchScore] = useMutation(
    DELETE_PLAYER_MATCH_SCORE_MUTATION,
    {
      onCompleted: () => {
        toast.success('PlayerMatchScore deleted')
        navigate(routes.playerMatchScores())
      },
    }
  )

  const onDeleteClick = (id) => {
    if (
      confirm('Are you sure you want to delete playerMatchScore ' + id + '?')
    ) {
      deletePlayerMatchScore({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            PlayerMatchScore {playerMatchScore.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{playerMatchScore.id}</td>
            </tr>
            <tr>
              <th>Score</th>
              <td>{playerMatchScore.score}</td>
            </tr>
            <tr>
              <th>User id</th>
              <td>{playerMatchScore.userId}</td>
            </tr>
            <tr>
              <th>Match id</th>
              <td>{playerMatchScore.matchId}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(playerMatchScore.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(playerMatchScore.updatedAt)}</td>
            </tr>
            <tr>
              <th>Won match</th>
              <td>{checkboxInputTag(playerMatchScore.wonMatch)}</td>
            </tr>
            <tr>
              <th>Bye</th>
              <td>{checkboxInputTag(playerMatchScore.bye)}</td>
            </tr>
            <tr>
              <th>Active</th>
              <td>{checkboxInputTag(playerMatchScore.active)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editPlayerMatchScore({ id: playerMatchScore.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <a
          href="#"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(playerMatchScore.id)}
        >
          Delete
        </a>
      </nav>
    </>
  )
}

export default PlayerMatchScore
