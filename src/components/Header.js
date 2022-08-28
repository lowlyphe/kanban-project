import React from 'react'

export default function Header({ currentBoard, handleNewTask }) {
  return (
    <div className='flex justify-between border border-solid-2 border-black h-12 '>
        <p>{currentBoard || 'No Board Selected'}</p>
        <div>
            <button onClick={() => handleNewTask()}>+ Add New Task</button>
        </div>
    </div>
  )
}
