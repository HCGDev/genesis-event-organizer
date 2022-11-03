import User from 'src/components/User'

export const QUERY = gql`
  query FIND_USER_BY_ID($id: String!) {
    user: user(id: $id) {
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
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>User not found</div>

export const Success = ({ user }) => {
  return <User user={user} />
}
