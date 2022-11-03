import { render } from '@redwoodjs/testing'

import TournamentNotStarted from './TournamentNotStarted'

describe('TournamentNotStarted', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TournamentNotStarted />)
    }).not.toThrow()
  })
})
