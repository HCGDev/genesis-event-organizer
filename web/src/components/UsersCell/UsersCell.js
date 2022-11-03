import { Link, routes } from '@redwoodjs/router'

import Users from 'src/components/Users'

export const beforeQuery = (props) => {
  return { variables: props }
}

export const QUERY = gql`
  query users($searchTerm: String) {
    users(searchTerm: $searchTerm) {
      id
      firstname
      lastname
      gender
      phone
      city
      state
      country
      zip
      createdAt
      updatedAt
      howHeard
      flags
      adminComments
      disabled
      disabledOn
      nickname
      userPictureId
      disabledBy
      email
      dob
      active
      UserUserRole {
        userRole {
          name
        }
      }
    }
  }
`
export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No users yet. '}
      <Link to={routes.newUser()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Success = ({ users }) => {
  return <Users users={users} />
}
