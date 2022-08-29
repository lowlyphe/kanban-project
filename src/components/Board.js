import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Todo from './Todo.js';
import Doing from './Doing.js';
import Done from './Done.js';

export default function Board({ currentBoardId, handleTask, currentBoard, newTask, newSubtasks, taskDeleted, updatedTask, viewNewBoard }) {
    const [todo, setTodo] = useState([])
    const [doing, setDoing] = useState([])
    const [done, setDone] = useState([])

    

    useEffect(() => {
        if (currentBoardId) {
          axios.get(`http://localhost:3001/api/tasks/${currentBoardId}`).then(res => {
            let todoArr = [];
            let doingArr = [];
            let doneArr = [];
          for (let i =0; i < res.data.length; i++) {
            if (res.data[i].status === "Todo") todoArr.push(res.data[i]);
            else if (res.data[i].status === "Doing") doingArr.push(res.data[i])
            else if (res.data[i].status === "Done") doneArr.push(res.data[i]);
          }
          setTodo(todoArr);
          setDoing(doingArr);
          setDone(doneArr);
        })
      }
      }, [currentBoardId])


    useEffect(() => {
      if (newTask.status === "Todo") setTodo(prevTodo => [...prevTodo, newTask]);
      if (newTask.status === "Doing") setDoing(prevDoing => [...prevDoing, newTask]);
      if (newTask.status === "Done") setDone(prevDone => [...prevDone, newTask]);
    }, [newTask])




  if (currentBoard) {
    return (
      <div className='flex justify-between bg-gray w-full h-screen text-mediumGray'>
          <Todo todo={todo} handleTask={handleTask} newSubtasks={newSubtasks} />
          <Doing doing={doing} handleTask={handleTask} newSubtasks={newSubtasks} />
          <Done done={done} handleTask={handleTask} newSubtasks={newSubtasks} />
      </div>
    )
  } else {
    return (
      <div className='flex flex-col space-y-4 bg-gray w-full h-screen text-mediumGray items-center justify-center'>
        <p>This board is empty. Create a board or choose an existing board to get started</p>
        <button className='bg-blue text-white text-sm rounded-full p-2' onClick={() => viewNewBoard()}>+ Add New Board</button>
      </div>
    )
  }
}
