import React from 'react'

export default function Header() {
  return (
    <div className='flex justify-between border border-solid-2 border-black h-12 '>
        <p>Platform Launch</p>
        <div>
            <button>+Add New Task</button>
        </div>
    </div>
  )
}
