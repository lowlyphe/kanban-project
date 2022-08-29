import React from 'react'
import cross from '../assets/icon-cross.svg'

export default function Viewboard({ subtasks, currentTask, taskClicked, handleCloseView }) {
    
    if (taskClicked) {
        let completed = 0;
        for (let i = 0; i < subtasks.length; i++) {
            if (subtasks[i].iscomplete) completed++
        }
        return (
            <div className='flex flex-col w-1/3 h-1/3 fixed left-1/3 top-1/4 z-10 bg-white space-y-2 border border-solid-1 border-gray rounded-md p-4'>
                <div className='flex space-between'><p>{currentTask.task_name}</p><button onClick={handleCloseView}><img src={cross} /></button></div>
                <p className='text-xs text-mediumGray'>{currentTask.description}</p>
                <p>{`Subtasks (${completed} of ${subtasks.length})`}</p>
                {subtasks.filter((function(subtask) {
                    if (subtask.iscomplete) return subtask
                    
                })).map(subtask => (<div className='bg-gray text-mediumGray text-xs line-through'>{subtask.subtask_name}</div>))
                }
                {subtasks.filter((function(subtask) {
                    if (!subtask.iscomplete) return subtask
                    
                })).map(subtask => (<div className='bg-gray text-xs'>{subtask.subtask_name}</div>))
                }
                <p className='text-xs text-mediumGray'>Current Status: {currentTask.status}</p>
            </div>
          )
        }
    return null
    }
    
  
