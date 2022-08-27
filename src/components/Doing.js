import React from 'react'
import Tasks from './Tasks'

export default function Doing({ doing, handleTask }) {
  return (
    <div className='flex flex-col border border-solid-2 border-black'>
      <p>Doing</p>
        {doing.map(doing => <div key={doing.taskname}><Tasks task={doing} handleTask={handleTask}/></div>)}
    </div>
  )
}
