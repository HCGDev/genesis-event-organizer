import { render } from '@redwoodjs/testing'

import ViewTournamentPage from './ViewTournamentPage'

describe('ViewTournamentPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ViewTournamentPage />)
    }).not.toThrow()
  })
})
