import { mockRedwoodDirective, getDirectiveName } from '@redwoodjs/testing/api'

import adminOnly from './adminOnly'

describe('adminOnly directive', () => {
  it('declares the directive sdl as schema, with the correct name', () => {
    expect(adminOnly.schema).toBeTruthy()
    expect(getDirectiveName(adminOnly.schema)).toBe('adminOnly')
  })

  it('has a adminOnly throws an error if validation does not pass', () => {
    const mockExecution = mockRedwoodDirective(adminOnly, {})

    expect(mockExecution).toThrowError('Implementation missing for adminOnly')
  })
})
