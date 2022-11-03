import { render } from '@redwoodjs/testing'

import MatchDetails from './MatchDetails'

describe('MatchDetails', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MatchDetails />)
    }).not.toThrow()
  })
})
