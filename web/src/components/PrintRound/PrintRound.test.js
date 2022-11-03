import { render } from '@redwoodjs/testing'

import PrintRound from './PrintRound'

describe('PrintRound', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PrintRound />)
    }).not.toThrow()
  })
})
