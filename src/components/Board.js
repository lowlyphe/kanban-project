import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Todo from './Todo.js';
import Doing from './Doing.js';
import Done from './Done.js';

export default function Board({ currentBoardId }) {
    const [todo, setTodo] = useState([])
    const [doing, setDoing] = useState([])
    const [done, setDone] = useState([])


    useEffect(() => {
        axios.get(`http://localhost:3001/api/tasks/${currentBoardId || 1}`).then(res => {
            console.log(res.data)
          for (let i =0; i < res.data.length; i++) {
            if (res.data[i].status === "Todo") setTodo([...todo, res.data[i]]);
            else if (res.data[i].status === "Doing") setDoing([...doing, res.data[i]]);
            else if (res.data[i].status === "Done") setDone([...done, res.data[i]]);
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
