// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, screen, act} from '@testing-library/react'
import {renderHook, act as HookAct} from '@testing-library/react-hooks'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'
// import TestRenderer from 'react-test-renderer'
// const {act} = TestRenderer
// import {act} from 'react-dom/test-utils'

// 🐨 create a simple function component that uses the useCounter hook
// and then exposes some UI that our test can interact with to test the
// capabilities of this hook
// 💰 here's how to use the hook:
// const {count, increment, decrement} = useCounter()

function MockComponent() {
  const {count, increment, decrement} = useCounter()

  return (
    <div>
      <div>Current Count: {count}</div>
      <button onClick={() => increment(count + 1)}>Increment</button>
      <button onClick={() => decrement(count - 1)}>Decrement</button>
    </div>
  )
}

test('exposes the count and increment/decrement functions', () => {
  // 🐨 render the component
  render(<MockComponent />)

  const countValue = screen.getByText(/current count:/i)
  const incButton = screen.getByRole('button', {name: /increment/i})
  const decButton = screen.getByRole('button', {name: /decrement/i})

  expect(countValue).toHaveTextContent('Current Count: 0')

  userEvent.click(incButton)

  expect(countValue).toHaveTextContent('Current Count: 1')

  userEvent.click(decButton)

  expect(countValue).toHaveTextContent('Current Count: 0')

  // 🐨 get the elements you need using screen
  // 🐨 assert on the initial state of the hook
  // 🐨 interact with the UI using userEvent and assert on the changes in the UI
})

const results = {}
function TestComponent(props) {
  Object.assign(results, useCounter())
  return null
}

test('without mocked Component', () => {
  render(<TestComponent />)

  expect(results.count).toBe(0)

  act(() => results.increment())

  expect(results.count).toBe(1)

  act(() => results.decrement())

  expect(results.count).toBe(0)
})

function SetUp(initialCount = 0, step = 1) {
  const results = {}
  function TestComponent({initialCount, step}) {
    results.current = useCounter({initialCount, step})
    return null
  }
  render(<TestComponent initialCount={initialCount} step={step} />)
  return results
}

test('ex-2 Setup function with two cases - Case 1 InitialCount', () => {
  const result = SetUp(5)

  // console.log(result)
  expect(result.current.count).toBe(5)

  const result2 = SetUp(67)

  expect(result2.current.count).toBe(67)

  const result3 = SetUp(6567)

  expect(result3.current.count).toBe(6567)
})

test('ex-2 Setup function with two cases - Case 1 Step', () => {
  const diff = SetUp(5, 2)

  expect(diff.current.count).toBe(5)

  act(() => diff.current.increment())

  expect(diff.current.count).toBe(7)

  act(() => diff.current.decrement())

  expect(diff.current.count).toBe(5)

  const result2 = SetUp(67, 2)

  expect(result2.current.count).toBe(67)

  act(() => result2.current.increment())

  expect(result2.current.count).toBe(69)

  act(() => result2.current.decrement())

  expect(result2.current.count).toBe(67)
})

test('Hook - Case 1 InitialCount', () => {
  const {result} = renderHook(() => useCounter({initialCount: 5}))

  expect(result.current.count).toBe(5)

  const {result: result2} = renderHook(() => useCounter({initialCount: 67}))

  expect(result2.current.count).toBe(67)

  const {result: result3} = renderHook(() => useCounter({initialCount: 6567}))

  expect(result3.current.count).toBe(6567)
})

test('Hook - Case 1 Step', () => {
  const {result: diff} = renderHook(() =>
    useCounter({initialCount: 5, step: 2}),
  )

  expect(diff.current.count).toBe(5)

  HookAct(() => diff.current.increment())

  expect(diff.current.count).toBe(7)

  HookAct(() => diff.current.decrement())

  expect(diff.current.count).toBe(5)

  const {result: result2} = renderHook(() =>
    useCounter({initialCount: 67, step: 2}),
  )

  expect(result2.current.count).toBe(67)

  HookAct(() => result2.current.increment())

  expect(result2.current.count).toBe(69)

  HookAct(() => result2.current.decrement())

  expect(result2.current.count).toBe(67)
})

/* eslint no-unused-vars:0 */
