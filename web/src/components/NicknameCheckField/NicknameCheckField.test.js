import { render } from '@redwoodjs/testing'

import NicknameCheckField from './NicknameCheckField'

describe('NicknameCheckField', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NicknameCheckField />)
    }).not.toThrow()
  })
})
