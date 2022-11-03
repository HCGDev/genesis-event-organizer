import ContactsLayout from 'src/layouts/ContactsLayout'
import EditContactCell from 'src/components/EditContactCell'

const EditContactPage = ({ id }) => {
  return (
    <ContactsLayout>
      <EditContactCell id={id} />
    </ContactsLayout>
  )
}

export default EditContactPage
