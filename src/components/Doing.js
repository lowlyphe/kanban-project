import React from 'react'
import Tasks from './Tasks'

export default function Doing({ doing, handleTask, newSubtasks }) {
  return (
    <div className='flex flex-col m-4 w-1/3'>
      <div className='flex items-center space-x-2'>
        <div className='bg-blue w-4 h-4 rounded-full'></div>
        <p>Doing ({doing.length})</p>
      </div>
      <div className='flex flex-col space-y-4 mt-4'>
          {doing.map(doing => <div className='text-black' key={doing.taskname}><Tasks task={doing} handleTask={handleTask} newSubtasks={newSubtasks}/></div>)}
        </div>
    </div>
  )
}
