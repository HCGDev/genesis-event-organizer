import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes } from '@redwoodjs/router'

import { QUERY } from 'src/components/UserUserRole/UserUserRolesCell'

const DELETE_USER_USER_ROLE_MUTATION = gql`
  mutation DeleteUserUserRoleMutation($id: Int!) {
    deleteUserUserRole(id: $id) {
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

const UserUserRolesList = ({ userUserRoles }) => {
  const [deleteUserUserRole] = useMutation(DELETE_USER_USER_ROLE_MUTATION, {
    onCompleted: () => {
      toast.success('UserUserRole deleted')
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete userUserRole ' + id + '?')) {
      deleteUserUserRole({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>User id</th>
            <th>User role id</th>
            <th>Active</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {userUserRoles.map((userUserRole) => (
            <tr key={userUserRole.id}>
              <td>{truncate(userUserRole.id)}</td>
              <td>{truncate(userUserRole.userId)}</td>
              <td>{truncate(userUserRole.userRoleId)}</td>
              <td>{checkboxInputTag(userUserRole.active)}</td>
              <td>{timeTag(userUserRole.createdAt)}</td>
              <td>{timeTag(userUserRole.updatedAt)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.userUserRole({ id: userUserRole.id })}
                    title={'Show userUserRole ' + userUserRole.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editUserUserRole({ id: userUserRole.id })}
                    title={'Edit userUserRole ' + userUserRole.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <a
                    href="#"
                    title={'Delete userUserRole ' + userUserRole.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(userUserRole.id)}
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

export default UserUserRolesList
