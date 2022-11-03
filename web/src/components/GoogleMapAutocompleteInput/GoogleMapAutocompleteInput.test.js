import { render } from '@redwoodjs/testing/web'

import GoogleMapAutocompleteInput from './GoogleMapAutocompleteInput'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('GoogleMapAutocompleteInput', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<GoogleMapAutocompleteInput />)
    }).not.toThrow()
  })
})
