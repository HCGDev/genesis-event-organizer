import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes, navigate } from '@redwoodjs/router'

import { QUERY } from 'src/components/ContactsCell'

const DELETE_CONTACT_MUTATION = gql`
  mutation DeleteContactMutation($id: Int!) {
    deleteContact(id: $id) {
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

const Contact = ({ contact }) => {
  const [deleteContact] = useMutation(DELETE_CONTACT_MUTATION, {
    onCompleted: () => {
      toast.success('Contact deleted')
      navigate(routes.contacts())
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete contact ' + id + '?')) {
      deleteContact({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Contact {contact.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{contact.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{contact.name}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{contact.email}</td>
            </tr>
            <tr>
              <th>Text</th>
              <td>{contact.text}</td>
            </tr>
            <tr>
              <th>User id</th>
              <td>{contact.userId}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(contact.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(contact.updatedAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editContact({ id: contact.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <a
          href="#"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(contact.id)}
        >
          Delete
        </a>
      </nav>
    </>
  )
}

export default Contact
