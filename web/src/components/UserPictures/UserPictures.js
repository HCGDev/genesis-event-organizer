import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes } from '@redwoodjs/router'

import { QUERY } from 'src/components/UserPicturesCell'

const DELETE_USER_PICTURE_MUTATION = gql`
  mutation DeleteUserPictureMutation($id: Int!) {
    deleteUserPicture(id: $id) {
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

const UserPicturesList = ({ userPictures }) => {
  const [deleteUserPicture] = useMutation(DELETE_USER_PICTURE_MUTATION, {
    onCompleted: () => {
      toast.success('UserPicture deleted')
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete userPicture ' + id + '?')) {
      deleteUserPicture({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Url</th>
            <th>Small url</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>Active</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {userPictures.map((userPicture) => (
            <tr key={userPicture.id}>
              <td>{truncate(userPicture.id)}</td>
              <td>{truncate(userPicture.name)}</td>
              <td>{truncate(userPicture.url)}</td>
              <td>{truncate(userPicture.smallUrl)}</td>
              <td>{timeTag(userPicture.createdAt)}</td>
              <td>{timeTag(userPicture.updatedAt)}</td>
              <td>{checkboxInputTag(userPicture.active)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.userPicture({ id: userPicture.id })}
                    title={'Show userPicture ' + userPicture.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editUserPicture({ id: userPicture.id })}
                    title={'Edit userPicture ' + userPicture.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <a
                    href="#"
                    title={'Delete userPicture ' + userPicture.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(userPicture.id)}
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

export default UserPicturesList
