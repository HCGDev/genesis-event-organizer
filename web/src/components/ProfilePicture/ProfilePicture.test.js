import { render } from '@redwoodjs/testing'

import ProfilePicture from './ProfilePicture'

describe('ProfilePicture', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ProfilePicture />)
    }).not.toThrow()
  })
})
