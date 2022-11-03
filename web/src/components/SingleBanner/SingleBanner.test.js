import { render } from '@redwoodjs/testing'

import SingleBanner from './SingleBanner'

describe('SingleBanner', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SingleBanner />)
    }).not.toThrow()
  })
})
