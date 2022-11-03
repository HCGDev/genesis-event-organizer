import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes, navigate } from '@redwoodjs/router'

import { QUERY } from 'src/components/UsersCell'

const DELETE_USER_MUTATION = gql`
  mutation DeleteUserMutation($id: String!) {
    deleteUser(id: $id) {
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

const User = ({ user }) => {
  const [deleteUser] = useMutation(DELETE_USER_MUTATION, {
    onCompleted: () => {
      toast.success('User deleted')
      navigate(routes.users())
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete user ' + id + '?')) {
      deleteUser({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            User {user.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{user.id}</td>
            </tr>
            <tr>
              <th>Firstname</th>
              <td>{user.firstname}</td>
            </tr>
            <tr>
              <th>Lastname</th>
              <td>{user.lastname}</td>
            </tr>
            <tr>
              <th>Gender</th>
              <td>{user.gender}</td>
            </tr>
            <tr>
              <th>Phone</th>
              <td>{user.phone}</td>
            </tr>
            <tr>
              <th>City</th>
              <td>{user.city}</td>
            </tr>
            <tr>
              <th>State</th>
              <td>{user.state}</td>
            </tr>
            <tr>
              <th>Country</th>
              <td>{user.country}</td>
            </tr>
            <tr>
              <th>Zip</th>
              <td>{user.zip}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(user.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(user.updatedAt)}</td>
            </tr>
            <tr>
              <th>How heard</th>
              <td>{user.howHeard}</td>
            </tr>
            <tr>
              <th>Flags</th>
              <td>{user.flags}</td>
            </tr>
            <tr>
              <th>Admin comments</th>
              <td>{user.adminComments}</td>
            </tr>
            <tr>
              <th>Disabled</th>
              <td>{checkboxInputTag(user.disabled)}</td>
            </tr>
            <tr>
              <th>Disabled on</th>
              <td>{timeTag(user.disabledOn)}</td>
            </tr>
            <tr>
              <th>Nickname</th>
              <td>{user.nickname}</td>
            </tr>
            <tr>
              <th>User picture id</th>
              <td>{user.userPictureId}</td>
            </tr>
            <tr>
              <th>Disabled by</th>
              <td>{user.disabledBy}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{user.email}</td>
            </tr>
            <tr>
              <th>Dob</th>
              <td>{user.dob}</td>
            </tr>
            <tr>
              <th>Active</th>
              <td>{checkboxInputTag(user.active)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editUser({ id: user.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <a
          href="#"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(user.id)}
        >
          Delete
        </a>
      </nav>
    </>
  )
}

export default User
