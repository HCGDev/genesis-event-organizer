export const standard = defineScenario({
  userUserRole: {
    one: {
      user: { create: { nickname: 'String1597014', email: 'String2416066' } },
      userRole: { create: { name: 'String260950' } },
    },

    two: {
      user: { create: { nickname: 'String8287230', email: 'String8030835' } },
      userRole: { create: { name: 'String1293826' } },
    },
  },
})
