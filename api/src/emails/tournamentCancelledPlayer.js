import mjml2html from 'mjml'
import emailTemplate1 from './template'

const tournamentCancelledPlayer = ({ options = {}, player, tournament }) => {
  const htmlOutput = mjml2html(
    emailTemplate1(
      `
      <mj-column>
      <mj-image width="75px" align="left" src="https://firebasestorage.googleapis.com/v0/b/genesis-events.appspot.com/o/Logo.png?alt=media&token=2169a5b8-9bc0-4647-ae70-a7f41db78a59" />
        <mj-text mj-class="header">
          Notice of Cancellation
        </mj-text>
        <mj-text mj-class="body">
          Hello ${player.nickname}
        </mj-text>
        <mj-text mj-class="body">
          We regret to inform you that the tournament, ${tournament.name} has been cancelled.
        </mj-text>
        <mj-text mj-class="body">
          You can find another tournament to register for at the link below:
        </mj-text>
        <mj-button background-color="#047857" color="white" href="${process.env.FRONTEND_URL}/search">
          Find a Tournament
        </mj-button>
        <mj-text mj-class="body">
          Thanks,
        </mj-text>
        <mj-text mj-class="body">
          GEM Team
        </mj-text>
      </mj-column>
      `
    ),
    options
  )

  return htmlOutput
}

export default tournamentCancelledPlayer
