import { render } from '@redwoodjs/testing'

import PlayerProfileItem from './PlayerProfileItem'

describe('PlayerProfileItem', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PlayerProfileItem />)
    }).not.toThrow()
  })
})
