import { render } from '@redwoodjs/testing'

import UserContactPage from './UserContactPage'

describe('UserContactPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UserContactPage />)
    }).not.toThrow()
  })
})
