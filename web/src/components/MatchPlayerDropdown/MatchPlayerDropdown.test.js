import { render } from '@redwoodjs/testing/web'

import MatchPlayerDropdown from './MatchPlayerDropdown'

describe('MatchPlayerDropdown', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MatchPlayerDropdown />)
    }).not.toThrow()
  })
})
