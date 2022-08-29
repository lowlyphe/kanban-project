import React, { useRef } from 'react'

export default function NewBoard({ newBoardClicked, handleNewBoard }) {
  const boardRef = useRef();
  if (newBoardClicked) {
    
    

    

    const sendNewBoard = () => {
      let boardName = boardRef.current.value;
      handleNewBoard(boardName);
    }

    return (
      <div className='flex flex-col w-1/3 fixed left-1/3 top-1/4 z-10 bg-white space-y-2 border border-solid-1 border-gray rounded-md p-4'>
          <div>Add New Board</div>
          <form className='flex flex-col syace-y-4'>
            <p className='text-xs text-mediumGray'>Name</p>
            <input className='border border-solid-1 border-gray w-5/6 text-xs text-gray p-2 rounded-md w-full' placeholder='eg Web Design' ref={boardRef}></input>
            </form>
          <button className='w-full rounded-full bg-blue text-white hover:bg-lightBlue' onClick={sendNewBoard}>Create New Board</button>
      </div>
    )

  } else {
    return (
      null
    )
  }
}
