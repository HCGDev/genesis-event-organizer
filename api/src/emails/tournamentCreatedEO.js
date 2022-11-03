import mjml2html from 'mjml'
import emailTemplate1 from './template'
import { format } from 'date-fns'

const tournamentCreatedEO = ({
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
          Your tournament has been successfully created!
        </mj-text>
        <mj-text mj-class="body">
          Hello ${owner.nickname}
        </mj-text>
        <mj-text mj-class="body">
          We would like to inform you that your Tournament, ${
            tournament.name
          }, has been successfully created, to take place on  ${format(
        new Date(tournament.startDate),
        'PPpp'
      )} at ${tournament.locationName}
        </mj-text>
        <mj-text mj-class="body">
          Visit the following link to view the tournament details in full
        </mj-text>
        <mj-button background-color="#047857" color="white" href="${
          process.env.FRONTEND_URL
        }/tournament/${tournament.tournamentUrl}/rounds">
          ${tournament.name} Tournament Page
        </mj-button>
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

export default tournamentCreatedEO
