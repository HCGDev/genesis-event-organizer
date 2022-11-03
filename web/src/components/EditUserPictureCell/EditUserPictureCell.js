import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import UserPictureForm from 'src/components/UserPictureForm'

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
const UPDATE_USER_PICTURE_MUTATION = gql`
  mutation UpdateUserPictureMutation(
    $id: Int!
    $input: UpdateUserPictureInput!
  ) {
    updateUserPicture(id: $id, input: $input) {
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

export const Success = ({ userPicture }) => {
  const [updateUserPicture, { loading, error }] = useMutation(
    UPDATE_USER_PICTURE_MUTATION,
    {
      onCompleted: () => {
        toast.success('UserPicture updated')
        navigate(routes.userPictures())
      },
    }
  )

  const onSave = (input, id) => {
    updateUserPicture({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit UserPicture {userPicture.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <UserPictureForm
          userPicture={userPicture}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
