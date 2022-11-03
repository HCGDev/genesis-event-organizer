import {
  userPictures,
  userPicture,
  createUserPicture,
  updateUserPicture,
  deleteUserPicture,
} from './userPictures'

describe('userPictures', () => {
  scenario('returns all userPictures', async (scenario) => {
    const result = await userPictures()

    expect(result.length).toEqual(Object.keys(scenario.userPicture).length)
  })

  scenario('returns a single userPicture', async (scenario) => {
    const result = await userPicture({ id: scenario.userPicture.one.id })

    expect(result).toEqual(scenario.userPicture.one)
  })

  scenario('creates a userPicture', async (scenario) => {
    const result = await createUserPicture({
      input: { url: 'String' },
    })

    expect(result.url).toEqual('String')
  })

  scenario('updates a userPicture', async (scenario) => {
    const original = await userPicture({ id: scenario.userPicture.one.id })
    const result = await updateUserPicture({
      id: original.id,
      input: { url: 'String2' },
    })

    expect(result.url).toEqual('String2')
  })

  scenario('deletes a userPicture', async (scenario) => {
    const original = await deleteUserPicture({
      id: scenario.userPicture.one.id,
    })

    const result = await userPicture({ id: original.id })

    expect(result).toEqual(null)
  })
})
