import { render } from '@redwoodjs/testing'

import AddTournamentPlayer from './AddTournamentPlayer'

describe('AddTournamentPlayer', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AddTournamentPlayer />)
    }).not.toThrow()
  })
})
