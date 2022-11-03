import { Link, routes } from '@redwoodjs/router'

import Contacts from 'src/components/Contacts'

export const QUERY = gql`
  query CONTACTS {
    contacts {
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

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No contacts yet. '}
      <Link to={routes.newContact()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Success = ({ contacts }) => {
  return <Contacts contacts={contacts} />
}
