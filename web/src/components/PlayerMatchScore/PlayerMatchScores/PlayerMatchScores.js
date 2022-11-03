import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes } from '@redwoodjs/router'

import { QUERY } from 'src/components/PlayerMatchScore/PlayerMatchScoresCell'

const DELETE_PLAYER_MATCH_SCORE_MUTATION = gql`
  mutation DeletePlayerMatchScoreMutation($id: Int!) {
    deletePlayerMatchScore(id: $id) {
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

const PlayerMatchScoresList = ({ playerMatchScores }) => {
  const [deletePlayerMatchScore] = useMutation(
    DELETE_PLAYER_MATCH_SCORE_MUTATION,
    {
      onCompleted: () => {
        toast.success('PlayerMatchScore deleted')
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
      confirm('Are you sure you want to delete playerMatchScore ' + id + '?')
    ) {
      deletePlayerMatchScore({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Score</th>
            <th>User id</th>
            <th>PlayerName</th>
            <th>Match id</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>Won match</th>
            <th>Bye</th>
            <th>Active</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {playerMatchScores.map((playerMatchScore) => (
            <tr key={playerMatchScore.id}>
              <td>{truncate(playerMatchScore.id)}</td>
              <td>{truncate(playerMatchScore.score)}</td>
              <td>{truncate(playerMatchScore.userId)}</td>
              <td>{truncate(playerMatchScore.playerName)}</td>
              <td>{truncate(playerMatchScore.matchId)}</td>
              <td>{timeTag(playerMatchScore.createdAt)}</td>
              <td>{timeTag(playerMatchScore.updatedAt)}</td>
              <td>{checkboxInputTag(playerMatchScore.wonMatch)}</td>
              <td>{checkboxInputTag(playerMatchScore.bye)}</td>
              <td>{checkboxInputTag(playerMatchScore.active)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.playerMatchScore({ id: playerMatchScore.id })}
                    title={
                      'Show playerMatchScore ' + playerMatchScore.id + ' detail'
                    }
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editPlayerMatchScore({
                      id: playerMatchScore.id,
                    })}
                    title={'Edit playerMatchScore ' + playerMatchScore.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <a
                    href="#"
                    title={'Delete playerMatchScore ' + playerMatchScore.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(playerMatchScore.id)}
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

export default PlayerMatchScoresList
