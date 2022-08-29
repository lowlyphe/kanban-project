import React from 'react'
import Tasks from './Tasks'

export default function Todo({ todo, handleTask, newSubtasks }) {
  return (
    <div className='flex flex-col m-4 w-1/3'>
      <div className='flex items-center space-x-2'>
        <div className='bg-cyan-500 w-4 h-4 rounded-full'></div>
        <p>Todo ({todo.length})</p>
      </div>
        <div className='flex flex-col space-y-4 mt-4'>
          {todo.map(todo => <div className='text-black' key={todo.taskname}><Tasks task={todo} handleTask={handleTask} newSubtasks={newSubtasks} /></div>)}
        </div>
    </div>
  )
}
