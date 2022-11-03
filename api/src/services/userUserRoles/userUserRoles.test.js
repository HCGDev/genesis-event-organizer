import {
  userUserRoles,
  userUserRole,
  createUserUserRole,
  updateUserUserRole,
  deleteUserUserRole,
} from './userUserRoles'

describe('userUserRoles', () => {
  scenario('returns all userUserRoles', async (scenario) => {
    const result = await userUserRoles()

    expect(result.length).toEqual(Object.keys(scenario.userUserRole).length)
  })

  scenario('returns a single userUserRole', async (scenario) => {
    const result = await userUserRole({ id: scenario.userUserRole.one.id })

    expect(result).toEqual(scenario.userUserRole.one)
  })

  scenario('creates a userUserRole', async (scenario) => {
    const result = await createUserUserRole({
      input: {
        userId: scenario.userUserRole.two.userId,
        userRoleId: scenario.userUserRole.two.userRoleId,
      },
    })

    expect(result.userId).toEqual(scenario.userUserRole.two.userId)
    expect(result.userRoleId).toEqual(scenario.userUserRole.two.userRoleId)
  })

  scenario('updates a userUserRole', async (scenario) => {
    const original = await userUserRole({ id: scenario.userUserRole.one.id })
    const result = await updateUserUserRole({
      id: original.id,
      input: { userId: scenario.userUserRole.two.userId },
    })

    expect(result.userId).toEqual(scenario.userUserRole.two.userId)
  })

  scenario('deletes a userUserRole', async (scenario) => {
    const original = await deleteUserUserRole({
      id: scenario.userUserRole.one.id,
    })

    const result = await userUserRole({ id: original.id })

    expect(result).toEqual(null)
  })
})
