import { render } from '@redwoodjs/testing'

import TournamentEOForm from './TournamentEOForm'

describe('TournamentEOForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TournamentEOForm />)
    }).not.toThrow()
  })
})
