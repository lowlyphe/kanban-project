import React, { useState, useRef } from 'react'
import axios from 'axios'
import cross from '../assets/icon-cross.svg'

export default function EditTask({ edit, handleSetEdit, currentTask, subtasks, handleDelete, handleDeleteSubtask, handleUpdateTask, currentBoardId }) {

    const [editState, setEditState] = useState(false)
    

    const subtaskRef = useRef()
    const titleRef = useRef()
    const descriptionRef = useRef()
    const statusRef = useRef()

    const taskObj = {
        task_id: currentTask.task_id,
        task_name: currentTask.task_name,
        description: currentTask.description,
        status: currentTask.status,
        board_id: currentBoardId
    }
    

    const handleDeletePrompt = () => {
        let result = window.confirm('DELETE?')
        if (result) {
            
            console.log('delete', currentTask.task_id, subtasks)
            for (let i = 0; i < subtasks.length; i++) {
                axios.delete(`http://localhost:3001/api/subtasks/${subtasks[i].subtask_id}`)
            }
            axios.delete(`http://localhost:3001/api/tasks/${currentTask.task_id}`).then(res => {
                handleDelete(currentTask)
            })

        }
        handleSetEdit()
    }

    const handleEditPrompt = () => {
        console.log(subtasks)
        setEditState(true)
    }

    const handleSendDeleteSubtask = (subtask) => {
        console.log(subtask.subtask_id, subtask.subtask_name)
        axios.delete(`http://localhost:3001/api/subtasks/${subtask.subtask_id}`).then(res => {
            console.log(res)
        })
        handleDeleteSubtask(subtask.subtask_name)
    }

    const handleUpdateUserTask = () => {
        console.log("whoel task:", taskObj)
        taskObj.task_name = titleRef.current.value
        taskObj.task_description = descriptionRef.current.value
        taskObj.status = statusRef.current.value
        axios.put(`http://localhost:3001/api/tasks/${taskObj.task_id}`, taskObj)
        handleUpdateTask(taskObj)
        handleSetEdit()
    }
    
    
    if (edit) {
        if (editState) {
            return(
                <div className='flex flex-col w-1/3 fixed left-1/3 top-1/4 z-10 bg-white space-y-2 border border-solid-1 border-gray rounded-md p-4'>
                <div>Edit Task</div>
                <form className='flex flex-col syace-y-4'>
                  <p className='text-xs text-mediumGray'>Title</p>
                  <input className='border border-solid-1 border-gray w-5/6 text-xs text-black p-2 rounded-md ' placeholder={currentTask.task_name} defaultValue={currentTask.task_name} ref={titleRef}></input>
                  <p className='text-xs text-mediumGray'>Description</p>
                  <input className='border border-solid-1 border-gray w-5/6 text-xs text-black p-2 rounded-md ' placeholder={currentTask.description} defaultValue={currentTask.description} ref={descriptionRef}></input>
                  <p className='text-xs text-mediumGray'>Subtasks</p>
                  <div className='flex flex-col space-y-2'>{subtasks.map(subtask => <div className=' flex justify-between space-x-2' key={subtask.subtask_name}><p className='border border-solid-1 border-gray text-sm w-full'>{subtask.subtask_name}</p><img className='w-4 h-4' onClick={() => handleSendDeleteSubtask(subtask)} src={cross} /></div>)}</div>
                  
                  <input className='border border-solid-1 border-gray w-5/6 text-xs text-black p-2 rounded-md ' placeholder="e.g. Make coffee" ref={subtaskRef}></input>
                </form>
                <button className='w-full rounded-full bg-gray hover:bg-offWhite text-blue'>+ Add New Subtask</button>
                <p className='text-sm'>Status</p>
                <select className='border border-solid-1 border-gray rounded-md text-sm' name='status' id='status' ref={statusRef}>
                  <option value='Todo' selected>Todo</option>
                  <option value='Doing' selected>Doing</option>
                  <option value='Done' selected>Done</option>
                </select>
                <button className='w-full rounded-full bg-blue hover:lightBlue hover:bg-offWhite text-white hover:text-black' onClick={() => handleUpdateUserTask()}>Save Changes</button>
            </div>
            )
            
        } else {
            return (
                <div className='flex flex-col absolute z-10 top-10 right-0 items-start bg-gray rounded-md p-2'>
                    <button onClick={() => handleEditPrompt()}>Edit Task</button>
                    <button onClick={() => handleDeletePrompt()} className='text-red'>Delete Task</button>
                </div>
                
              )
        }
        
    }

    return null
  
}
