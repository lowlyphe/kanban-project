import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Tasks({ task, handleTask }) {

    

    useEffect(() => {
        axios.get(`http://localhost:3001/api/task/${task.task_id}`).then((res) => {
            console.log(res.data)
        })
    }, [])

  return (
    <div>
        <button onClick={handleTask(task)}>{task.taskname}</button>
    </div>
  )
}
