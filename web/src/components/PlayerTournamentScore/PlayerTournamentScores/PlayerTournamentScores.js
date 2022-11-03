import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes } from '@redwoodjs/router'

import { QUERY } from 'src/components/PlayerTournamentScore/PlayerTournamentScoresCell'

const DELETE_PLAYER_TOURNAMENT_SCORE_MUTATION = gql`
  mutation DeletePlayerTournamentScoreMutation($id: Int!) {
    deletePlayerTournamentScore(id: $id) {
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

const PlayerTournamentScoresList = ({ playerTournamentScores }) => {
  const [deletePlayerTournamentScore] = useMutation(
    DELETE_PLAYER_TOURNAMENT_SCORE_MUTATION,
    {
      onCompleted: () => {
        toast.success('PlayerTournamentScore deleted')
      },
      // This refetches the query on the list page. Read more about other ways to
      // update the cache over here:
      // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
      refetchQueries: [{ query: QUERY }],
      awaitRefetchQueries: true,
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
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Player Nickname</th>
            <th>Tournament Name</th>
            <th>Wins</th>
            <th>Losses</th>
            <th>Draws</th>
            <th>Byes</th>
            <th>Score</th>
            <th>Won tournament</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>Active</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {playerTournamentScores.map((playerTournamentScore) => (
            <tr key={playerTournamentScore.id}>
              <td>{truncate(playerTournamentScore.id)}</td>
              <td>
                {playerTournamentScore.player ? (
                  <Link
                    to={routes.users({
                      searchTerm: playerTournamentScore.player?.nickname,
                    })}
                    className="text-blue-500 cursor-pointer"
                  >
                    {playerTournamentScore.player?.nickname}
                  </Link>
                ) : (
                  <span>{playerTournamentScore.playerName}</span>
                )}
              </td>
              <td>
                <Link
                  to={routes.tournaments({
                    searchTerm: playerTournamentScore.tournament?.name,
                  })}
                  className="text-blue-500 cursor-pointer"
                >
                  {playerTournamentScore.tournament?.name}
                </Link>
              </td>

              <td>{truncate(playerTournamentScore.wins)}</td>
              <td>{truncate(playerTournamentScore.losses)}</td>
              <td>{truncate(playerTournamentScore.draws)}</td>
              <td>{truncate(playerTournamentScore.byes)}</td>
              <td>{truncate(playerTournamentScore.score)}</td>
              <td>{checkboxInputTag(playerTournamentScore.wonTournament)}</td>
              <td>{timeTag(playerTournamentScore.createdAt)}</td>
              <td>{timeTag(playerTournamentScore.updatedAt)}</td>
              <td>{checkboxInputTag(playerTournamentScore.active)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.playerTournamentScore({
                      id: playerTournamentScore.id,
                    })}
                    title={
                      'Show playerTournamentScore ' +
                      playerTournamentScore.id +
                      ' detail'
                    }
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editPlayerTournamentScore({
                      id: playerTournamentScore.id,
                    })}
                    title={
                      'Edit playerTournamentScore ' + playerTournamentScore.id
                    }
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <a
                    href="#"
                    title={
                      'Delete playerTournamentScore ' + playerTournamentScore.id
                    }
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(playerTournamentScore.id)}
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

export default PlayerTournamentScoresList
