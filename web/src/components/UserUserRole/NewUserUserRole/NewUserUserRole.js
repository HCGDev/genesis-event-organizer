import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import UserUserRoleForm from 'src/components/UserUserRole/UserUserRoleForm'

const CREATE_USER_USER_ROLE_MUTATION = gql`
  mutation CreateUserUserRoleMutation($input: CreateUserUserRoleInput!) {
    createUserUserRole(input: $input) {
      id
    }
  }
`

const NewUserUserRole = () => {
  const [createUserUserRole, { loading, error }] = useMutation(
    CREATE_USER_USER_ROLE_MUTATION,
    {
      onCompleted: () => {
        toast.success('UserUserRole created')
        navigate(routes.userUserRoles())
      },
    }
  )

  const onSave = (input) => {
    const castInput = Object.assign(input, {
      userRoleId: parseInt(input.userRoleId),
    })
    createUserUserRole({ variables: { input: castInput } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New UserUserRole</h2>
      </header>
      <div className="rw-segment-main">
        <UserUserRoleForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewUserUserRole
