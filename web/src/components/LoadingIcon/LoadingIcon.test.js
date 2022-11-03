import { render } from '@redwoodjs/testing'

import LoadingIcon from './LoadingIcon'

describe('LoadingIcon', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<LoadingIcon />)
    }).not.toThrow()
  })
})
