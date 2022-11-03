import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import UserPictureForm from 'src/components/UserPictureForm'

import { QUERY } from 'src/components/UserPicturesCell'

const CREATE_USER_PICTURE_MUTATION = gql`
  mutation CreateUserPictureMutation($input: CreateUserPictureInput!) {
    createUserPicture(input: $input) {
      id
    }
  }
`

const NewUserPicture = () => {
  const [createUserPicture, { loading, error }] = useMutation(
    CREATE_USER_PICTURE_MUTATION,
    {
      onCompleted: () => {
        toast.success('UserPicture created')
        navigate(routes.userPictures())
      },
    }
  )

  const onSave = (input) => {
    createUserPicture({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New UserPicture</h2>
      </header>
      <div className="rw-segment-main">
        <UserPictureForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewUserPicture
