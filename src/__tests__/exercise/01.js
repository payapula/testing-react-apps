// simple test with ReactDOM
// http://localhost:3000/counter

import * as React from 'react'
import ReactDOM from 'react-dom'
import Counter from '../../components/counter'

test('counter increments and decrements when the buttons are clicked', () => {
  // 🐨 create a div to render your component to (💰 document.createElement)

  const div = document.createElement('div')

  document.body.append(div)

  ReactDOM.render(<Counter />, div)

  const btns = div.querySelectorAll('button')
  const text = div.firstChild.querySelector('div')

  expect(text.textContent).toBe('Current count: 0')
  const decrement = btns[0]
  const increment = btns[1]

  const clicker = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    button: 0,
  })

  increment.dispatchEvent(clicker)

  // increment.click()
  expect(text.textContent).toBe('Current count: 1')

  decrement.dispatchEvent(clicker)

  expect(text.textContent).toBe('Current count: 0')

  div.remove()
})

/* eslint no-unused-vars:0 */
