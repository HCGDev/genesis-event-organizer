import { render } from '@redwoodjs/testing'

import TournamentSignupTab from './TournamentSignupTab'

describe('TournamentSignupTab', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TournamentSignupTab />)
    }).not.toThrow()
  })
})
