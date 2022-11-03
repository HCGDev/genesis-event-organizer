import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import StoreForm from 'src/components/StoreForm'

export const QUERY = gql`
  query FIND_STORE_BY_ID($id: String!) {
    store: store(id: $id) {
      id
      name
      ownerId
      email
      phone
      lat
      lng
      street1
      street2
      city
      country
      state
      zip
      distributor
      approved
      approvedOn
    }
  }
`
const UPDATE_STORE_MUTATION = gql`
  mutation UpdateStoreMutation($id: String!, $input: UpdateStoreInput!) {
    updateStore(id: $id, input: $input) {
      id
      name
      ownerId
      email
      phone
      lat
      lng
      street1
      street2
      city
      country
      state
      zip
      distributor
      approved
      approvedOn
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Success = ({ store }) => {
  const [updateStore, { loading, error }] = useMutation(UPDATE_STORE_MUTATION, {
    onCompleted: () => {
      toast.success('Store updated')
      navigate(routes.stores())
    },
  })

  const onSave = (input, id) => {
    updateStore({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Store {store.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <StoreForm
          store={store}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
