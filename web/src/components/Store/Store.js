import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes, navigate } from '@redwoodjs/router'

import { QUERY } from 'src/components/StoresCell'
import Tournament from '../Tournament/Tournament'
import TournamentsList from '../Tournaments/Tournaments'

const DELETE_STORE_MUTATION = gql`
  mutation DeleteStoreMutation($id: String!) {
    deleteStore(id: $id) {
      id
    }
  }
`

const jsonDisplay = (obj) => {
  return (
    <pre>
      <code>{JSON.stringify(obj, null, 2)}</code>
    </pre>
  )
}

const timeTag = (datetime) => {
  return (
    <time dateTime={datetime} title={datetime}>
      {new Date(datetime).toUTCString()}
    </time>
  )
}

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}

const Store = ({ store }) => {
  const [deleteStore] = useMutation(DELETE_STORE_MUTATION, {
    onCompleted: () => {
      toast.success('Store deleted')
      navigate(routes.stores())
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete store ' + id + '?')) {
      deleteStore({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Store {store.name} Details Page
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{store.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{store.name}</td>
            </tr>
            <tr>
              <th>Owner</th>
              <td>
                {' '}
                <Link
                  to={routes.users({ searchTerm: store.owner?.nickname })}
                  className="text-blue-500 cursor-pointer"
                >
                  {store.owner?.nickname}
                </Link>
              </td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{store.email}</td>
            </tr>
            <tr>
              <th>Phone</th>
              <td>{store.phone}</td>
            </tr>
            <tr>
              <th>Lat</th>
              <td>{store.lat}</td>
            </tr>
            <tr>
              <th>Lng</th>
              <td>{store.lng}</td>
            </tr>
            <tr>
              <th>Street1</th>
              <td>{store.street1}</td>
            </tr>
            <tr>
              <th>Street2</th>
              <td>{store.street2}</td>
            </tr>
            <tr>
              <th>City</th>
              <td>{store.city}</td>
            </tr>
            <tr>
              <th>Country</th>
              <td>{store.country}</td>
            </tr>
            <tr>
              <th>State</th>
              <td>{store.state}</td>
            </tr>
            <tr>
              <th>Zip</th>
              <td>{store.zip}</td>
            </tr>
            <tr>
              <th>Distributor</th>
              <td>{store.distributor}</td>
            </tr>
            <tr>
              <th>Approved</th>
              <td>{checkboxInputTag(store.approved)}</td>
            </tr>
            <tr>
              <th>Approved on</th>
              <td>{timeTag(store.approvedOn)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editStore({ id: store.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <a
          href="#"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(store.id)}
        >
          Delete
        </a>
      </nav>
      {store.tournaments && (
        <div className="mt-4">
          <header className="">
            <h2 className="rw-heading rw-heading-secondary">
              Store {store.name} Tournaments
            </h2>
          </header>
          <TournamentsList tournaments={store.tournaments} />
        </div>
      )}
    </>
  )
}

export default Store
