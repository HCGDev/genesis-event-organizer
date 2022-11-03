import { render } from '@redwoodjs/testing'

import TournamentItem from './TournamentItem'

describe('TournamentItem', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TournamentItem />)
    }).not.toThrow()
  })
})
