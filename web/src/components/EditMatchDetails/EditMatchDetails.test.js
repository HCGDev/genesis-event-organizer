import { render } from '@redwoodjs/testing'

import EditMatchDetails from './EditMatchDetails'

describe('EditMatchDetails', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<EditMatchDetails />)
    }).not.toThrow()
  })
})
