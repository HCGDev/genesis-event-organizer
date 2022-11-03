import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes, navigate } from '@redwoodjs/router'

const DELETE_PLAYER_TOURNAMENT_SCORE_MUTATION = gql`
  mutation DeletePlayerTournamentScoreMutation($id: Int!) {
    deletePlayerTournamentScore(id: $id) {
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

const PlayerTournamentScore = ({ playerTournamentScore }) => {
  const [deletePlayerTournamentScore] = useMutation(
    DELETE_PLAYER_TOURNAMENT_SCORE_MUTATION,
    {
      onCompleted: () => {
        toast.success('PlayerTournamentScore deleted')
        navigate(routes.playerTournamentScores())
      },
    }
  )

  const onDeleteClick = (id) => {
    if (
      confirm(
        'Are you sure you want to delete playerTournamentScore ' + id + '?'
      )
    ) {
      deletePlayerTournamentScore({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            PlayerTournamentScore {playerTournamentScore.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{playerTournamentScore.id}</td>
            </tr>
            <tr>
              <th>Wins</th>
              <td>{playerTournamentScore.wins}</td>
            </tr>
            <tr>
              <th>Losses</th>
              <td>{playerTournamentScore.losses}</td>
            </tr>
            <tr>
              <th>Score</th>
              <td>{playerTournamentScore.score}</td>
            </tr>
            <tr>
              <th>Player name</th>
              <td>{playerTournamentScore.playerName}</td>
            </tr>
            <tr>
              <th>Player id</th>
              <td>{playerTournamentScore.playerId}</td>
            </tr>
            <tr>
              <th>Tournament id</th>
              <td>{playerTournamentScore.tournamentId}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(playerTournamentScore.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(playerTournamentScore.updatedAt)}</td>
            </tr>
            <tr>
              <th>Draws</th>
              <td>{playerTournamentScore.draws}</td>
            </tr>
            <tr>
              <th>Byes</th>
              <td>{playerTournamentScore.byes}</td>
            </tr>
            <tr>
              <th>Active</th>
              <td>{checkboxInputTag(playerTournamentScore.active)}</td>
            </tr>
            <tr>
              <th>Won tournament</th>
              <td>{checkboxInputTag(playerTournamentScore.wonTournament)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editPlayerTournamentScore({
            id: playerTournamentScore.id,
          })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <a
          href="#"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(playerTournamentScore.id)}
        >
          Delete
        </a>
      </nav>
    </>
  )
}

export default PlayerTournamentScore
