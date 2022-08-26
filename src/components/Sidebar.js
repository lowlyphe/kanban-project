import React from 'react'

export default function Sidebar({ boards, updateCurrentBoard }) {
  return (
    <div className='flex flex-col justify-between  border border-solid-2 border-black w-32 h-screen text-xs'>
        <p>ALL BOARDS ()</p>
        {boards.map(b => <button key={b.board_id} data-id={b.board_id} onClick={updateCurrentBoard}>{b.name}</button>)}
        <div className='flex flex-col mb-auto'>
            <button>+Create New Board</button>
        </div>
        <button>Hide Sidebar</button>
        
    </div>
  )
}
