import { render } from '@redwoodjs/testing/web'

import TieBreakerModal from './EndTournamentModal'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('TieBreakerModal', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TieBreakerModal />)
    }).not.toThrow()
  })
})
