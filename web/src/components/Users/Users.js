import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes } from '@redwoodjs/router'

import { QUERY } from 'src/components/UsersCell'

const DELETE_USER_MUTATION = gql`
  mutation DeleteUserMutation($id: String!) {
    deleteUser(id: $id) {
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

const UsersList = ({ users }) => {
  const [deleteUser] = useMutation(DELETE_USER_MUTATION, {
    onCompleted: () => {
      toast.success('User deleted')
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete user ' + id + '?')) {
      deleteUser({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <div className="my-1 flex flex-col justify-around text-center">
        <div>{users.length} Total Users</div>
        <div>
          {
            users.filter(
              (user) => user.UserUserRole[0]?.userRole?.name === 'PLAYER'
            ).length
          }{' '}
          Players
        </div>
        <div>
          {
            users.filter(
              (user) => user.UserUserRole[0]?.userRole?.name === 'EO'
            ).length
          }{' '}
          Event Organizers
        </div>
        <div>
          {
            users.filter(
              (user) => user.UserUserRole[0]?.userRole?.name === 'ADMIN'
            ).length
          }{' '}
          Admins
        </div>
      </div>
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Gender</th>
            <th>Phone</th>
            <th>City</th>
            <th>State</th>
            <th>Country</th>
            <th>Zip</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>How heard</th>
            <th>Flags</th>
            <th>Admin comments</th>
            <th>Disabled</th>
            <th>Disabled on</th>
            <th>Nickname</th>
            <th>User picture id</th>
            <th>Disabled by</th>
            <th>Email</th>
            <th>Dob</th>
            <th>Active</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{truncate(user.id)}</td>
              <td>{truncate(user.firstname)}</td>
              <td>{truncate(user.lastname)}</td>
              <td>{truncate(user.gender)}</td>
              <td>{truncate(user.phone)}</td>
              <td>{truncate(user.city)}</td>
              <td>{truncate(user.state)}</td>
              <td>{truncate(user.country)}</td>
              <td>{truncate(user.zip)}</td>
              <td>{timeTag(user.createdAt)}</td>
              <td>{timeTag(user.updatedAt)}</td>
              <td>{truncate(user.howHeard)}</td>
              <td>{truncate(user.flags)}</td>
              <td>{truncate(user.adminComments)}</td>
              <td>{checkboxInputTag(user.disabled)}</td>
              <td>{timeTag(user.disabledOn)}</td>
              <td>{truncate(user.nickname)}</td>
              <td>{truncate(user.userPictureId)}</td>
              <td>{truncate(user.disabledBy)}</td>
              <td>{truncate(user.email)}</td>
              <td>{truncate(user.dob)}</td>
              <td>{checkboxInputTag(user.active)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.user({ id: user.id })}
                    title={'Show user ' + user.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editUser({ id: user.id })}
                    title={'Edit user ' + user.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <a
                    href="#"
                    title={'Delete user ' + user.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(user.id)}
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

export default UsersList
