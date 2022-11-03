import { render } from '@redwoodjs/testing'

import TournamentSearchPage from './TournamentSearchPage'

describe('TournamentSearchPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TournamentSearchPage />)
    }).not.toThrow()
  })
})
