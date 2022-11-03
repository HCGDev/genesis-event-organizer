import { render } from '@redwoodjs/testing'

import TournamentTimer from './TournamentTimer'

describe('TournamentTimer', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TournamentTimer />)
    }).not.toThrow()
  })
})
