import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes } from '@redwoodjs/router'

import { QUERY } from 'src/components/StoresCell'

const DELETE_STORE_MUTATION = gql`
  mutation DeleteStoreMutation($id: String!) {
    deleteStore(id: $id) {
      id
    }
  }
`

const MAX_STRING_LENGTH = 150

const truncate = (text) => {
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

const jsonTruncate = (obj) => {
  return truncate(JSON.stringify(obj, null, 2))
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

const StoresList = ({ stores }) => {
  const [deleteStore] = useMutation(DELETE_STORE_MUTATION, {
    onCompleted: () => {
      toast.success('Store deleted')
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete store ' + id + '?')) {
      deleteStore({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <div className="my-1 flex flex-col justify-around text-center">
        <div>{stores.length} Total Stores</div>
        <div>
          {stores.filter((store) => store.approved).length} Total Approved
          Stores
        </div>
      </div>
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Owner</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Lat</th>
            <th>Lng</th>
            <th>Street1</th>
            <th>Street2</th>
            <th>City</th>
            <th>Country</th>
            <th>State</th>
            <th>Zip</th>
            <th>PlaceId</th>
            <th>Distributor</th>
            <th>Hidden</th>
            <th>Approved</th>
            <th>Approved on</th>
            <th>Approved By</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {stores.map((store) => (
            <tr key={store.id}>
              <td>{truncate(store.id)}</td>
              <td>{truncate(store.name)}</td>
              <td>
                <Link
                  to={routes.users({ searchTerm: store.owner?.nickname })}
                  className="text-blue-500 cursor-pointer"
                >
                  {store.owner?.nickname}
                </Link>
              </td>
              <td>{truncate(store.email)}</td>
              <td>{truncate(store.phone)}</td>
              <td>{truncate(store.lat)}</td>
              <td>{truncate(store.lng)}</td>
              <td>{truncate(store.street1)}</td>
              <td>{truncate(store.street2)}</td>
              <td>{truncate(store.city)}</td>
              <td>{truncate(store.country)}</td>
              <td>{truncate(store.state)}</td>
              <td>{truncate(store.zip)}</td>
              <td>{truncate(store.placeId)}</td>
              <td>{truncate(store.distributor)}</td>
              <td>{checkboxInputTag(store.hidden)}</td>
              <td>{checkboxInputTag(store.approved)}</td>
              <td>{timeTag(store.approvedOn)}</td>
              <td>
                <Link
                  to={routes.users({ searchTerm: store.approvedBy?.nickname })}
                  className="text-blue-500 cursor-pointer"
                >
                  {store.approvedBy?.nickname}
                </Link>
              </td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.store({ id: store.id })}
                    title={'Show store ' + store.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editStore({ id: store.id })}
                    title={'Edit store ' + store.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <a
                    href="#"
                    title={'Delete store ' + store.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(store.id)}
                  >
                    Delete
                  </a>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default StoresList
