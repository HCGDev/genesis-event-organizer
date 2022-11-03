import { render } from '@redwoodjs/testing'

import PasswordSettingsTab from './PasswordSettingsTab'

describe('PasswordSettingsTab', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PasswordSettingsTab />)
    }).not.toThrow()
  })
})
