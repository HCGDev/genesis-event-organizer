import { Link, routes } from '@redwoodjs/router'

import UserUserRoles from 'src/components/UserUserRole/UserUserRoles'

export const QUERY = gql`
  query USER_USER_ROLES {
    userUserRoles {
      id
      userId
      userRoleId
      active
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No userUserRoles yet. '}
      <Link to={routes.newUserUserRole()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Success = ({ userUserRoles }) => {
  return <UserUserRoles userUserRoles={userUserRoles} />
}
