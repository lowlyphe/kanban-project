import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Subtask from './Subtask'

export default function Tasks({ task, handleTask, newSubtasks }) {

    const [subtasks, setSubTasks] = useState([])

    useEffect(() => {
        console.log('subtasks in tasks:', newSubtasks)
        axios.get(`/api/task/${task.task_id}`).then((res) => {
            for (let i = 0; i < res.data.length; i++) {
                setSubTasks(prevSubtasks => [...prevSubtasks, res.data[i]])
            }              
        })
    }, [])

    useEffect(() => {        
        for (let i = 0; i < newSubtasks.length; i++) {
            setSubTasks(prevSubtasks => [...prevSubtasks, newSubtasks[i]])
        }
    }, [])
  

  return (
    <button className='bg-white rounded-md drop-shadow-md p-2 w-5/6'>
        <div onClick={() => {handleTask(task, subtasks)}}>
            <div>{task.task_name}</div>
            <Subtask subtasks={subtasks}/>
        </div>
    </button>
  )
}
