import { render } from '@redwoodjs/testing/web'

import AddMatchForm from './AddMatchForm'

describe('AddMatchForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AddMatchForm />)
    }).not.toThrow()
  })
})
