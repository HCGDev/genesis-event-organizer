import { render } from '@redwoodjs/testing'

import UserPictureSelector from './UserPictureSelector'

describe('UserPictureSelector', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UserPictureSelector />)
    }).not.toThrow()
  })
})
