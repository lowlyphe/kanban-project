import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar.js';
import Header from './components/Header.js';
import Board from './components/Board.js';
import Viewboard from './components/Viewboard.js';
import NewBoard from './components/NewBoard.js';
import NewTask from './components/NewTask.js';
import './App.css';
import axios from 'axios';
import { v4 } from 'uuid'


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
  const [newSubtasks, setNewSubtasks] = useState([])
  const [taskDeleted, setTaskDeleted] = useState({})
  const [updatedTask, setUpdatedTask] = useState()

  useEffect(() => {
    axios.get('/api/boards').then(res => {
      const boards = [];
      for (let i = 0; i < res.data.length; i++) {
        boards.push(res.data[i]);
      }
      setBoards(boards)
    })
  }, []);

  function updateCurrentBoard(e) {
    setCurrentBoard(e.target.innerText);
    setCurrentBoardId(e.target.dataset.id);
  }

  function handleTask(tasks, subtasks) {
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
  }

  function handleNewBoard(boardName) {
    const newBoard = {
      board_id: v4(),
      board_name: boardName,
      isComplete: false
    }

    axios.post('/api/boards', {newBoard}).then(res => {
      setBoards(prevBoards => [...prevBoards, res.data])
    })
  }

  function handleNewTask() {
    setNewTaskClicked(newTaskClicked => !newTaskClicked)
    
  }

  function sendNewTask(taskObj, subtasks) {
    axios.post('/api/tasks', {taskObj}).then(res => {
      setNewTask(res.data[0])
      for (let i = 1; i < subtasks.length; i++) {
        subtasks[i].task_id = taskObj.task_id
        axios.post('/api/subtasks', subtasks[i]).then(res => setNewSubtasks(prevNewSubtasks => [...prevNewSubtasks, res.data]))
        
      }
    }
    )
    handleNewTask();
  }

  const handleDelete = (newState) => {
    console.log("new state:", newState)
    setTaskDeleted({
      task_name: newState.task_name,
      status: newState.status
    })

  }

  const handleDeleteSubtask = (subtask) => {
    console.log('deletedsubtask:', subtask)
    console.log('current subtasks:', subtasks)
    setSubtasks(subtasks.filter(subtaskItems => subtaskItems.subtask_name !== subtask))
    
  }

  const handleUpdateTask = (taskObj) => {
    console.log("updated task:", taskObj)
    setUpdatedTask(taskObj)

  }

  

  return (
    <div className='flex'>
      <Sidebar boards={boards} updateCurrentBoard={updateCurrentBoard} hideSidebar={hideSidebar} hidden={hidden} viewNewBoard={viewNewBoard} />
      <div className='flex flex-col w-full'>
        <Header currentBoard={currentBoard} handleNewTask={handleNewTask}/>
        <Board currentBoardId={currentBoardId} currentBoard={currentBoard} handleTask={handleTask} newTask={newTask} newSubtasks={newSubtasks} taskDeleted={taskDeleted} updatedTask={updatedTask} viewNewBoard={viewNewBoard} />
        <Viewboard subtasks={subtasks} currentTask={currentTask} taskClicked={taskClicked} handleCloseView={handleCloseView} handleDelete={handleDelete} handleDeleteSubtask={handleDeleteSubtask} handleUpdateTask={handleUpdateTask} currentBoardId={currentBoardId} />
        <NewBoard handleNewBoard={handleNewBoard} newBoardClicked={newBoardClicked} />
        <NewTask newTaskClicked={newTaskClicked} sendNewTask={sendNewTask} currentBoardId={currentBoardId}/>
      </div>
    </div>
    
  );
}

export default App;
