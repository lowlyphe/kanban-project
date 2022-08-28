import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Subtask from './Subtask'

export default function Tasks({ task, handleTask }) {

    const [subtasks, setSubTasks] = useState()

    const subTasksArr = []

    useEffect(() => {
        axios.get(`http://localhost:3001/api/task/${task.task_id}`).then((res) => {
            console.log('subtasks', res.data)
            for (let i = 0; i < res.data.length; i++) {
                subTasksArr.push(res.data[i])
            }

            setSubTasks(subTasksArr)
        })
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
