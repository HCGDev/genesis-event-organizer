import { render } from '@redwoodjs/testing'

import TournamentMatchesTab from './TournamentMatchesTab'

describe('TournamentMatchesTab', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TournamentMatchesTab />)
    }).not.toThrow()
  })
})
