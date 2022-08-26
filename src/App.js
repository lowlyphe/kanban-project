import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar.js';
import Header from './components/Header.js';
import Board from './components/Board.js';
import './App.css';
import axios from 'axios';


function App() {

  const [boards, setBoards] = useState([])
  const [currentBoard, setCurrentBoard] = useState()
  const [currentBoardId, setCurrentBoardId] = useState();


  useEffect(() => {
    axios.get('http://localhost:3001/api/boards').then(res => {
      const boards = [];
      for (let i = 0; i < res.data.length; i++) {
        boards.push(res.data[i]);
      }
      setBoards(boards)
    })
  }, []);

  function updateCurrentBoard(e) {
    console.log(e.target.dataset.id)
    setCurrentBoard(e.target.innerText);
    setCurrentBoardId(e.target.dataset.id);
  }


  return (
    <div className='flex'>
      <Sidebar boards={boards} updateCurrentBoard={updateCurrentBoard}/>
      <div className='flex flex-col'>
        <Header />
        <Board boardId={currentBoardId}/>
      </div>
    </div>
    
  );
}

export default App;
