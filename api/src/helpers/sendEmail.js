import mailgun from 'mailgun-js'
import * as Sentry from '@sentry/node'

const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_BASE_URL,
})

export const sendEmail = async ({ to, subject, text, html }) => {
  const data = {
    from: 'Genesis Event Organizer <noreply@mail.geo.genesisbattlesofchampions.com>',
    to: process.env.ENV === 'PROD' ? to : 'abbassalisiwjeesudden@gmail.com',
    bcc: process.env.ENV === 'PROD' ? process.env.ADMIN_EMAILS : '',
    subject,
    text,
    html,
  }

  await mg.messages().send(data, (error, body) => {
    console.log('Body', body)
    if (error) {
      Sentry.captureException(error, { ...data })
    }
  })
}
