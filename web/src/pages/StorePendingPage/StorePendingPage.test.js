import { render } from '@redwoodjs/testing'

import StorePendingPage from './StorePendingPage'

describe('StorePendingPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<StorePendingPage />)
    }).not.toThrow()
  })
})
