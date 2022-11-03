import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import UserUserRoleForm from 'src/components/UserUserRole/UserUserRoleForm'

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
const UPDATE_USER_USER_ROLE_MUTATION = gql`
  mutation UpdateUserUserRoleMutation(
    $id: Int!
    $input: UpdateUserUserRoleInput!
  ) {
    updateUserUserRole(id: $id, input: $input) {
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

export const Success = ({ userUserRole }) => {
  const [updateUserUserRole, { loading, error }] = useMutation(
    UPDATE_USER_USER_ROLE_MUTATION,
    {
      onCompleted: () => {
        toast.success('UserUserRole updated')
        navigate(routes.userUserRoles())
      },
    }
  )

  const onSave = (input, id) => {
    const castInput = Object.assign(input, {
      userRoleId: parseInt(input.userRoleId),
    })
    updateUserUserRole({ variables: { id, input: castInput } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit UserUserRole {userUserRole.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <UserUserRoleForm
          userUserRole={userUserRole}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
