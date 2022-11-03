import mjml2html from 'mjml'
import emailTemplate1 from './template'

const newPlayerRegisteredEO = ({ options = {}, player, tournament }) => {
  const htmlOutput = mjml2html(
    emailTemplate1(
      `
      <mj-column>
      <mj-image width="75px" align="left" src="https://firebasestorage.googleapis.com/v0/b/genesis-events.appspot.com/o/Logo.png?alt=media&token=2169a5b8-9bc0-4647-ae70-a7f41db78a59" />
        <mj-text mj-class="header">
          The player ${player.nickname} has registered for your tournament: ${tournament.name}
        </mj-text>
        <mj-text mj-class="body">
          Visit the following link to view the tournament:
        </mj-text>
        <mj-button background-color="#047857" color="white" href="${process.env.FRONTEND_URL}/tournament/${tournament.tournamentUrl}/rounds">
          ${tournament.name} Tournament Page
        </mj-button>
      </mj-column>
      `
    ),
    options
  )

  return htmlOutput
}

export default newPlayerRegisteredEO
