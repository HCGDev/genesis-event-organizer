import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes, navigate } from '@redwoodjs/router'

import { QUERY } from 'src/components/UserPicturesCell'

const DELETE_USER_PICTURE_MUTATION = gql`
  mutation DeleteUserPictureMutation($id: Int!) {
    deleteUserPicture(id: $id) {
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

const UserPicture = ({ userPicture }) => {
  const [deleteUserPicture] = useMutation(DELETE_USER_PICTURE_MUTATION, {
    onCompleted: () => {
      toast.success('UserPicture deleted')
      navigate(routes.userPictures())
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete userPicture ' + id + '?')) {
      deleteUserPicture({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            UserPicture {userPicture.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{userPicture.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{userPicture.name}</td>
            </tr>
            <tr>
              <th>Url</th>
              <td>{userPicture.url}</td>
            </tr>
            <tr>
              <th>Small url</th>
              <td>{userPicture.smallUrl}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(userPicture.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(userPicture.updatedAt)}</td>
            </tr>
            <tr>
              <th>Active</th>
              <td>{checkboxInputTag(userPicture.active)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editUserPicture({ id: userPicture.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <a
          href="#"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(userPicture.id)}
        >
          Delete
        </a>
      </nav>
    </>
  )
}

export default UserPicture
