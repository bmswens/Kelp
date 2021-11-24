// React
import React from 'react'

// testing library
import { render } from '@testing-library/react'

// to test
import App from './App'

describe('<App>', function() {
  it('should render', function() {
    window.matchMedia = jest.fn().mockReturnValue({})
    render(<App />)
  })
  it('should render light theme', function() {
    window.matchMedia = jest.fn().mockReturnValue({matches: true})
    render(<App />)
  })
})