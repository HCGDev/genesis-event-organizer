import { render } from '@redwoodjs/testing'

import TournamentLeaderboardTab from './TournamentLeaderboardTab'

describe('TournamentLeaderboardTab', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TournamentLeaderboardTab />)
    }).not.toThrow()
  })
})
