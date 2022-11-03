import UserUserRole from 'src/components/UserUserRole/UserUserRole'

export const QUERY = gql`
  query FindUserUserRoleById($id: Int!) {
    userUserRole: userUserRole(id: $id) {
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

export const Empty = () => <div>UserUserRole not found</div>

export const Success = ({ userUserRole }) => {
  return <UserUserRole userUserRole={userUserRole} />
}
