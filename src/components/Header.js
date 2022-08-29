import React from 'react'

export default function Header({ currentBoard, handleNewTask }) {
  return (
    <div className='flex justify-between border border-solid-1 border-gray h-16 p-3 font-bold'>
        <p>{currentBoard || 'No Board Selected'}</p>
        <div>
        <button className='w-full rounded-full bg-blue hover:lightBlue hover:bg-offWhite text-white hover:text-black text-sm font-light p-2' onClick={() => handleNewTask()}>+ Add New Task</button>
        </div>
    </div>
  )
}
