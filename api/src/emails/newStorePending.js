import mjml2html from 'mjml'
import emailTemplate1 from './template'

const newStorePending = ({ options = {}, store }) => {
  const htmlOutput = mjml2html(
    emailTemplate1(
      `
      <mj-column>
      <mj-image width="75px" align="left" src="https://firebasestorage.googleapis.com/v0/b/genesis-events.appspot.com/o/Logo.png?alt=media&token=2169a5b8-9bc0-4647-ae70-a7f41db78a59" />
        <mj-text mj-class="header">
          The following store is pending: ${store.name}
        </mj-text>
        <mj-text mj-class="body">
          Visit the following link to approve the store
        </mj-text>
        <mj-button background-color="#047857" color="white" href="${process.env.FRONTEND_URL}/admin/stores/${store.id}/edit">
          ${store.name} Page
        </mj-button>
      </mj-column>
      `
    ),
    options
  )

  return htmlOutput
}

export default newStorePending
