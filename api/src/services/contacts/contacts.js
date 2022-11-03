import newContactFilled from 'src/emails/newContactFilled'
import { sendEmail } from 'src/helpers/sendEmail'
import { db } from 'src/lib/db'

export const contacts = () => {
  return db.contact.findMany()
}

export const contact = ({ id }) => {
  return db.contact.findUnique({
    where: { id },
  })
}

export const createContact = async ({ input }) => {
  let currentUser = context.currentUser

  let contact = await db.contact.create({
    data: {
      ...input,
      userContact: currentUser?.user.id
        ? { connect: { id: currentUser.user.id } }
        : undefined,
    },
  })

  let html = `${newContactFilled({ contact }).html}`
  sendEmail({
    to: process.env.ADMIN_EMAILS,
    subject: `GEO: New Contact Form from: ${contact.name}`,
    html,
    text: `New Contact Form from: ${contact.name}`,
  })

  return contact
}

export const updateContact = ({ id, input }) => {
  return db.contact.update({
    data: input,
    where: { id },
  })
}

export const deleteContact = ({ id }) => {
  return db.contact.delete({
    where: { id },
  })
}

export const Contact = {
  userContact: (_obj, { root }) =>
    db.contact.findUnique({ where: { id: root.id } }).userContact(),
}
