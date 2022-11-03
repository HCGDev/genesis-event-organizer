import { render } from '@redwoodjs/testing'

import PasswordCheck from './PasswordCheck'

describe('PasswordCheck', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PasswordCheck />)
    }).not.toThrow()
  })
})
