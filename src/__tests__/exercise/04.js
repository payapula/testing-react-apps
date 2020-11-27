// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'
import {build, fake} from '@jackfranklin/test-data-bot'

const buildLoginForm = build({
  fields: {
    username: fake(f => f.internet.userName()),
    password: fake(f => f.internet.password()),
  },
})

test('submitting the form calls onSubmit with username and password', () => {
  const handleSubmit = jest.fn()

  const {username, password} = buildLoginForm()

  console.log(username, password)
  render(<Login onSubmit={handleSubmit} />)

  const usernamefield = screen.getByLabelText(/username/i)
  const passwordfield = screen.getByLabelText(/password/i)

  userEvent.type(usernamefield, username)
  userEvent.type(passwordfield, password)

  const submitButton = screen.getByRole('button', {name: /submit/i})

  userEvent.click(submitButton)

  expect(handleSubmit).toHaveBeenCalledWith({
    username,
    password,
  })
})

/*
eslint
  no-unused-vars: "off",
*/
