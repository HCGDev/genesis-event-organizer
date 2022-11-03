import { render } from '@redwoodjs/testing/web'

import CutOffModal from './CutOffModal'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CutOffModal', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CutOffModal />)
    }).not.toThrow()
  })
})
