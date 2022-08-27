import React from 'react'
import Tasks from './Tasks'

export default function Done({ done, handleTask }) {
  return (
    <div className='flex flex-col m-4 w-1/3'>
      <div className='flex items-center space-x-2'>
        <div className='bg-green-500 w-4 h-4 rounded-full'></div>
        <p>Done ({done.length})</p>
      </div>
      <div className='flex flex-col space-y-4 mt-4'>
          {done.map(done => <div className='text-black' key={done.taskname}><Tasks task={done} handleTask={handleTask}/></div>)}
        </div>
    </div>
  )
}
