import React from 'react'

export default function NewBoard({ newBoardClicked }) {
  if (newBoardClicked) {
    return (
      <div className='flex flex-col w-1/3 fixed left-1/3 top-1/4 z-10 bg-white space-y-2 border border-solid-1 border-gray rounded-md p-4'>
          <div>Add New Board</div>
          <form className='flex flex-col syace-y-4'>
            <p className='text-xs text-mediumGray'>Name</p>
            <input className='border border-solid-1 border-gray w-5/6 text-xs text-gray p-2 rounded-md w-full' placeholder='eg Web Design'></input>
            </form>
          <button className='w-full rounded-full bg-blue text-white hover:bg-lightBlue'>Create New Board</button>
      </div>
    )

  } else {
    return (
      null
    )
  }
}
