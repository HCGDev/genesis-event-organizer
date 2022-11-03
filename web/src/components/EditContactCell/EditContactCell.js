import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import ContactForm from 'src/components/ContactForm'

export const QUERY = gql`
  query FIND_CONTACT_BY_ID($id: Int!) {
    contact: contact(id: $id) {
      id
      name
      email
      text
      userId
      createdAt
      updatedAt
    }
  }
`
const UPDATE_CONTACT_MUTATION = gql`
  mutation UpdateContactMutation($id: Int!, $input: UpdateContactInput!) {
    updateContact(id: $id, input: $input) {
      id
      name
      email
      text
      userId
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Success = ({ contact }) => {
  const [updateContact, { loading, error }] = useMutation(
    UPDATE_CONTACT_MUTATION,
    {
      onCompleted: () => {
        toast.success('Contact updated')
        navigate(routes.contacts())
      },
    }
  )

  const onSave = (input, id) => {
    updateContact({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Contact {contact.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <ContactForm
          contact={contact}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
