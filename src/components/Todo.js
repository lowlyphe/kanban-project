import React from 'react'

export default function Todo({ todo }) {
    console.log("in todos", todo)
  return (
    <div className='flex flex-col border border-solid-2 border-black'>
        {todo.map(todo => <div key={todo.taskname}>{todo.taskname}</div>)}
    </div>
  )
}
