import UserPicture from 'src/components/UserPicture'

export const QUERY = gql`
  query FIND_USER_PICTURE_BY_ID($id: Int!) {
    userPicture: userPicture(id: $id) {
      id
      name
      url
      smallUrl
      createdAt
      updatedAt
      active
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>UserPicture not found</div>

export const Success = ({ userPicture }) => {
  return <UserPicture userPicture={userPicture} />
}
