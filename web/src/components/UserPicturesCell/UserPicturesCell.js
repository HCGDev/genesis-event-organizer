import { Link, routes } from '@redwoodjs/router'

import UserPictures from 'src/components/UserPictures'

export const QUERY = gql`
  query USER_PICTURES {
    userPictures {
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

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No userPictures yet. '}
      <Link to={routes.newUserPicture()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Success = ({ userPictures }) => {
  return <UserPictures userPictures={userPictures} />
}
