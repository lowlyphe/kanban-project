import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar.js';
import Header from './components/Header.js';
import Board from './components/Board.js';
import Viewboard from './components/Viewboard.js';
import NewBoard from './components/NewBoard.js';
import NewTask from './components/NewTask.js';
import './App.css';
import axios from 'axios';


function App() {

  const [boards, setBoards] = useState([])
  const [currentBoard, setCurrentBoard] = useState(null)
  const [currentBoardId, setCurrentBoardId] = useState(null);
  const [subtasks, setSubtasks] = useState();
  const [currentTask, setCurrentTask] = useState();
  const [hidden, setHidden] = useState()
  const [taskClicked, setTaskClicked] = useState(false)
  const [newBoardClicked, setNewBoardClicked] = useState(false)
  const [newBoard, setNewBoard] = useState({})
  const [newTaskClicked, setNewTaskClicked] = useState()
  const [newTask, setNewTask] = useState({})

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
    console.log('state updated')
  }

  function handleTask(tasks, subtasks) {
    console.log('shit')
    setTaskClicked(taskClicked => !taskClicked)
    setCurrentTask(tasks)
    setSubtasks(subtasks)
  }

  function hideSidebar() {
    setHidden(hidden => !hidden)
  }

  function handleCloseView() {
    setTaskClicked(taskClicked => !taskClicked)
  }

  function viewNewBoard() {
    setNewBoardClicked(newBoardClicked => !newBoardClicked)
    console.log('clicked')
  }

  function handleNewBoard(board) {
    console.log(board)
  }

  function handleNewTask() {
    setNewTaskClicked(newTaskClicked => !newTaskClicked)
  }


  return (
    <div className='flex'>
      <Sidebar boards={boards} updateCurrentBoard={updateCurrentBoard} hideSidebar={hideSidebar} hidden={hidden} viewNewBoard={viewNewBoard} />
      <div className='flex flex-col w-full'>
        <Header currentBoard={currentBoard} handleNewTask={handleNewTask}/>
        <Board currentBoardId={currentBoardId} currentBoard={currentBoard} handleTask={handleTask}/>
        <Viewboard subtasks={subtasks} currentTask={currentTask} taskClicked={taskClicked} handleCloseView={handleCloseView} />
        <NewBoard handleNewBoard={handleNewBoard} newBoardClicked={newBoardClicked} />
        <NewTask newTaskClicked={newTaskClicked}  />
      </div>
    </div>
    
  );
}

export default App;
