import mjml2html from 'mjml'
import emailTemplate1 from './template'
import { isEqual, format } from 'date-fns'

const tournamentEditedPlayer = ({
  options = {},
  prevTournament,
  tournament,
  player,
}) => {
  const htmlOutput = mjml2html(
    emailTemplate1(
      `
      <mj-column>
        <mj-image width="75px" align="left" src="https://firebasestorage.googleapis.com/v0/b/genesis-events.appspot.com/o/Logo.png?alt=media&token=2169a5b8-9bc0-4647-ae70-a7f41db78a59" />
        <mj-text mj-class="header">
          The Tournament you have registered for has been updated!
        </mj-text>
        <mj-text mj-class="body">
          Hello ${player.nickname}
        </mj-text>
        <mj-text mj-class="body">
          We would like to inform you that the Tournament you have registered for on ${format(
            new Date(prevTournament.startDate),
            'PP'
          )} located at ${prevTournament.locationName}, ${
        prevTournament.street1 || ''
      } at ${format(new Date(prevTournament.startDate), 'p')} has been changed.
        </mj-text>
        <mj-text mj-class="body">
          Please see below for the following changes:
        </mj-text>
        ${
          prevTournament.name !== tournament.name &&
          `<mj-section>
            <mj-column>
              <mj-text  mj-class="body" color="red" text-decoration="line-through">${prevTournament.name}</mj-text>
            </mj-column>
            <mj-column>
              <mj-text font-size="20px" align="center">➝</mj-text>
            </mj-column>
            <mj-column>
              <mj-text mj-class="body">
                ${tournament.name}
              </mj-text>
            </mj-column>
          </mj-section>`
        }
        ${
          !isEqual(
            new Date(prevTournament.startDate),
            new Date(tournament.startDate)
          ) &&
          `<mj-section>
            <mj-column>
              <mj-text  mj-class="body" color="red" text-decoration="line-through">${format(
                new Date(prevTournament.startDate),
                'PPpp'
              )}</mj-text>
            </mj-column>
            <mj-column>
              <mj-text font-size="20px" align="center">➝</mj-text>
            </mj-column>
            <mj-column>
              <mj-text mj-class="body">
              ${format(new Date(tournament.startDate), 'PPpp')}
              </mj-text>
            </mj-column>
          </mj-section>`
        }
        ${
          prevTournament.locationName !== tournament.locationName &&
          `<mj-section>
            <mj-column>
              <mj-text  mj-class="body" color="red" text-decoration="line-through">${prevTournament.locationName}</mj-text>
            </mj-column>
            <mj-column>
              <mj-text font-size="20px" align="center">➝</mj-text>
            </mj-column>
            <mj-column>
              <mj-text mj-class="body">
              ${tournament.locationName}
              </mj-text>
            </mj-column>
          </mj-section>`
        }
        <mj-text mj-class="body">
          Visit the following link to view the tournament details in full
        </mj-text>
        <mj-button background-color="#047857" color="white" href="${
          process.env.FRONTEND_URL
        }/tournament/${tournament.tournamentUrl}/rounds">
          ${tournament.name} Tournament Page
        </mj-button>
      </mj-column>
      `
    ),
    options
  )

  return htmlOutput
}

export default tournamentEditedPlayer
