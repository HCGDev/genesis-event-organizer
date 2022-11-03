import ContactsLayout from 'src/layouts/ContactsLayout'
import ContactCell from 'src/components/ContactCell'

const ContactPage = ({ id }) => {
  return (
    <ContactsLayout>
      <ContactCell id={id} />
    </ContactsLayout>
  )
}

export default ContactPage
