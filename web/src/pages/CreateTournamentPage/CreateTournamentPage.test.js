import { render } from '@redwoodjs/testing'

import CreateTournamentPage from './CreateTournamentPage'

describe('CreateTournamentPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CreateTournamentPage />)
    }).not.toThrow()
  })
})
