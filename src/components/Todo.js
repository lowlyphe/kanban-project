import React from 'react'

export default function Todo({ todo }) {
    console.log("in todos", todo)
  return (
    <div>
        {todo.map(todo => <div>{todo.taskName}</div>)}
    </div>
  )
}
