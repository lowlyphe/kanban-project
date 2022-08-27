import React from 'react'

export default function Done({ done }) {
  return (
    <div className='flex flex-col border border-solid-2 border-black'>
      <p>Done</p>
        {done.map(done => <div key={done.taskname}>{done.taskname}</div>)}
    </div>
  )
}
