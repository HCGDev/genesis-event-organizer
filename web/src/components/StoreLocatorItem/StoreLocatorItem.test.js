import { render } from '@redwoodjs/testing/web'

import StoreLocatorItem from './StoreLocatorItem'

describe('StoreLocatorItem', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<StoreLocatorItem />)
    }).not.toThrow()
  })
})
