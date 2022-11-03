import { render } from '@redwoodjs/testing'

import EOEditTournamentPage from './EOEditTournamentPage'

describe('EOEditTournamentPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<EOEditTournamentPage />)
    }).not.toThrow()
  })
})
