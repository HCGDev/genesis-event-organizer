import { render } from '@redwoodjs/testing'

import TournamentRoundsTab from './TournamentRoundsTab'

describe('TournamentRoundsTab', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TournamentRoundsTab />)
    }).not.toThrow()
  })
})
