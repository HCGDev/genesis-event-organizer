import mjml2html from 'mjml'
import emailTemplate1 from './template'

const tournamentCancelledEO = ({
  options = {},
  tournament,
  owner,
  adminEmail = false,
}) => {
  const htmlOutput = mjml2html(
    emailTemplate1(
      `
      <mj-column>
        <mj-image width="75px" align="left" src="https://firebasestorage.googleapis.com/v0/b/genesis-events.appspot.com/o/Logo.png?alt=media&token=2169a5b8-9bc0-4647-ae70-a7f41db78a59" />
        <mj-text mj-class="header">
          Hello ${owner.nickname}
        </mj-text>
        <mj-text mj-class="header">
          The tournament ${tournament.name} has been successfully cancelled.
        </mj-text>
        <mj-text mj-class="body">
          If you have not done this intentionally, please let the admin team know.
        </mj-text>
        <mj-text>
        ${
          adminEmail
            ? 'This is a copy of the email sent to the event organizers'
            : ''
        }
        </mj-text>
      </mj-column>
      `
    ),
    options
  )

  return htmlOutput
}

export default tournamentCancelledEO
