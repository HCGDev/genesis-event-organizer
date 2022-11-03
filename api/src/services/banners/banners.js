import { db } from 'src/lib/db'

export const banners = () => {
  return db.banner.findMany()
}

export const homeBanners = () => {
  let currentUser = context.currentUser
  let conditions = ['ALL']
  if (currentUser) {
    conditions.push('LOGGEDIN')
    if (currentUser.roles.indexOf('PLAYER') != -1) {
      conditions.push('PLAYER')
    }

    if (currentUser.roles.indexOf('EO') !== -1) {
      conditions.push('EO')
    }
  } else {
    conditions.push('GUEST')
  }

  return db.banner.findMany({
    where: { active: true, condition: { in: conditions } },
  })
}

export const banner = ({ id }) => {
  return db.banner.findUnique({
    where: { id },
  })
}

export const createBanner = ({ input }) => {
  return db.banner.create({
    data: input,
  })
}

export const updateBanner = ({ id, input }) => {
  return db.banner.update({
    data: input,
    where: { id },
  })
}

export const deleteBanner = ({ id }) => {
  return db.banner.delete({
    where: { id },
  })
}
