import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import UserForm from 'src/components/UserForm'

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
const UPDATE_USER_MUTATION = gql`
  mutation UpdateUserMutation($id: String!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
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

export const Success = ({ user }) => {
  const [updateUser, { loading, error }] = useMutation(UPDATE_USER_MUTATION, {
    onCompleted: () => {
      toast.success('User updated')
      navigate(routes.users())
    },
  })

  const onSave = (input, id) => {
    const castInput = Object.assign(input, {
      userPictureId: parseInt(input.userPictureId),
    })
    updateUser({ variables: { id, input: castInput } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit User {user.id}</h2>
      </header>
      <div className="rw-segment-main">
        <UserForm user={user} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
