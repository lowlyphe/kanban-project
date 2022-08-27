import React from 'react'

export default function Viewboard({ subtasks, currentTask }) {
    
    if (currentTask) {
        console.log('subtasks:', subtasks,'currentTask:', currentTask)
        let completed = 0;
        for (let i = 0; i < subtasks.length; i++) {
            if (subtasks[i].iscomplete) completed++
        }
        return (
            <div className='flex flex-col w-full h-full fixed top-0 bottom-0 z-10 bg-white space-y-2 w-96'>
                <p>{currentTask.taskname}</p>
                <p className='text-xs text-mediumGray'>{currentTask.description}</p>
                <p>{`Subtasks (${completed} of ${subtasks.length})`}</p>
                {subtasks.filter((subtasks.iscomplete) return <div className='bg-gray'>{subtask.name}</div>)}
                <p className='text-xs text-mediumGray'>Current Status</p>
                <p>Current Status: {currentTask.status}</p>

            </div>
          )
        }
    return null
    }
    
  
