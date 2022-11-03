import { render } from '@redwoodjs/testing/web'

import StoreLocatorPage from './StoreLocatorPage'

describe('StoreLocatorPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<StoreLocatorPage />)
    }).not.toThrow()
  })
})
