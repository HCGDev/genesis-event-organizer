import { render } from '@redwoodjs/testing'

import StoreSettingsTab from './StoreSettingsTab'

describe('StoreSettingsTab', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<StoreSettingsTab />)
    }).not.toThrow()
  })
})
