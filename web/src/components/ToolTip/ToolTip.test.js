import { render } from '@redwoodjs/testing'

import ToolTip from './ToolTip'

describe('ToolTip', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ToolTip />)
    }).not.toThrow()
  })
})
