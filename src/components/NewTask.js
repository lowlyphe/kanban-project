import React, {useState, useRef} from 'react'
import { v4 } from 'uuid'

export default function NewTask({ newTaskClicked, sendNewTask, currentBoardId }) {

    
    const [currentSubtasks, setCurrentSubtasks] = useState([])
    const subtaskRef = useRef()
    const titleRef = useRef()
    const descriptionRef = useRef()
    const statusRef = useRef()

    const taskObj = {
        task_id: v4(),
        name: '',
        description: '',
        status: '',
        board_id: currentBoardId
    }

    const subtaskArr = [currentSubtasks]

    const sendTask = () => {
        taskObj.name = titleRef.current.value;
        taskObj.description = descriptionRef.current.value;
        taskObj.status = statusRef.current.value;
        sendNewTask(taskObj)
    }

    const handleNewSubtasks = (subtaskRef) => {
        console.log(subtaskRef.current.value)
        setCurrentSubtasks(prevSubtasks => [...prevSubtasks, subtaskRef.current.value])
    }

    if (newTaskClicked) {
        return (
            <div className='flex flex-col w-1/3 fixed left-1/3 top-1/4 z-10 bg-white space-y-2 border border-solid-1 border-gray rounded-md p-4'>
                <div>Add New Task</div>
                <form className='flex flex-col syace-y-4'>
                  <p className='text-xs text-mediumGray'>Title</p>
                  <input className='border border-solid-1 border-gray w-5/6 text-xs text-black p-2 rounded-md ' placeholder='eg Take a coffee break' ref={titleRef}></input>
                  <p className='text-xs text-mediumGray'>Description</p>
                  <input className='border border-solid-1 border-gray w-5/6 text-xs text-black p-2 rounded-md ' placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little." ref={descriptionRef}></input>
                  <p className='text-xs text-mediumGray'>Subtasks</p>
                  <div className='flex flex-col space-y-2'>{currentSubtasks.map(subtasks => <div className='bg-gray'>{subtasks}</div>)}</div>
                  
                  <input className='border border-solid-1 border-gray w-5/6 text-xs text-black p-2 rounded-md ' placeholder="e.g. Make coffee" ref={subtaskRef}></input>
                </form>
                <button className='w-full rounded-full bg-gray hover:bg-offWhite text-blue' onClick={() => handleNewSubtasks(subtaskRef)}>+ Add New Subtask</button>
                <p className='text-sm'>Status</p>
                <select className='border border-solid-1 border-gray rounded-md text-sm' name='status' id='status' ref={statusRef}>
                  <option value='Todo' selected>Todo</option>
                  <option value='Doing' selected>Doing</option>
                  <option value='Done' selected>Done</option>
                </select>
                <button className='w-full rounded-full bg-blue hover:lightBlue hover:bg-offWhite text-white hover:text-black' onClick={() => sendTask()}>Create Task</button>
            </div>
          )
    } else {
        return null;
    }
    
}
