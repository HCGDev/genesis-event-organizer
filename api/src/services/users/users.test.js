import { users, user, createUser, updateUser, deleteUser } from './users'

describe('users', () => {
  scenario('returns all users', async (scenario) => {
    const result = await users()

    expect(result.length).toEqual(Object.keys(scenario.user).length)
  })

  scenario('returns a single user', async (scenario) => {
    const result = await user({ id: scenario.user.one.id })

    expect(result).toEqual(scenario.user.one)
  })

  scenario('creates a user', async (scenario) => {
    const result = await createUser({
      input: { nickname: 'String6430545', email: 'String4984360' },
    })

    expect(result.nickname).toEqual('String6430545')
    expect(result.email).toEqual('String4984360')
  })

  scenario('updates a user', async (scenario) => {
    const original = await user({ id: scenario.user.one.id })
    const result = await updateUser({
      id: original.id,
      input: { nickname: 'String54374802' },
    })

    expect(result.nickname).toEqual('String54374802')
  })

  scenario('deletes a user', async (scenario) => {
    const original = await deleteUser({ id: scenario.user.one.id })
    const result = await user({ id: original.id })

    expect(result).toEqual(null)
  })
})
