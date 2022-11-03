import { render } from '@redwoodjs/testing'

import UserSettingsTab from './UserSettingsTab'

describe('UserSettingsTab', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UserSettingsTab />)
    }).not.toThrow()
  })
})
