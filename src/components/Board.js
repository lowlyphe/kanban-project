import React, { useEffect } from 'react'
import axios from 'axios'
import Todo from './Todo.js';
import Doing from './Doing.js';
import Done from './Done.js';

export default function Board({ currentBoardId }) {
    const tasks = []
    const todo = []
    const doing = []
    const done = []

    useEffect(() => {
        axios.get(`http://localhost:3001/api/tasks/${currentBoardId || 1}`).then(res => {
          for (let i =0; i < res.data.length; i++) {
            if (res.data[i].status === "Todo") todo.push(res.data[i]);
            else if (res.data[i].status === "Doing") doing.push(res.data[i]);
            else if (res.data[i].status === "Done") done.push(res.data[i]);
          }
        })
      }, []);

  return (
    <div className='flex'>
        <Todo todo={todo}/>
        <Doing doing={doing}/>
        <Done done={done}/>
    </div>
  )
}
