import { render } from '@redwoodjs/testing/web'

import ViewStorePage from './ViewStorePage'

describe('ViewStorePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ViewStorePage />)
    }).not.toThrow()
  })
})
