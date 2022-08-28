import React from 'react'
import { v4 }from 'uuid'
import boardLogo from '../assets/icon-board.svg';
import hide from '../assets/icon-hide-sidebar.svg';
import show from '../assets/icon-show-sidebar.svg';

export default function Sidebar({ boards, updateCurrentBoard, hideSidebar, hidden, viewNewBoard }) {
  if (!hidden) {
    return (
      <div className='flex flex-col ml-4 items-start space-y-6 w-48 h-screen text-xs text-mediumGray'>
          <p className='mt-6'>ALL BOARDS ({boards.length})</p>
          {boards.map(b => <div key={v4()} className='flex space-x-2 focus:bg-blue'>
                              <img key={v4()} src={boardLogo} />
                              <button key={v4()} data-id={b.board_id} onClick={updateCurrentBoard}>{b.board_name}</button>
                            </div>)}
          <div className='flex flex-col mb-auto'>
          <div className='flex text-blue'><img src={boardLogo} /><button onClick={() => viewNewBoard()}>+Create New Board</button></div>
          </div>
          <div className='flex fixed left-4 bottom-8 z-10'><img src={hide} /><button onClick={hideSidebar}>Hide Sidebar</button></div>
          
          
      </div>
    )

  } else {
    return (
      <button onClick={hideSidebar} className='bg-blue fixed left-0 bottom-8 z-10 p-4 rounded-r-full'><img src={show}/></button>
    )
  }
  }
  
