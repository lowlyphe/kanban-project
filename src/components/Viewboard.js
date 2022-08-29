import React, { useState } from 'react'
import EditTask from './EditTask';
import cross from '../assets/icon-cross.svg'
import ellipsis from '../assets/icon-vertical-ellipsis.svg'

export default function Viewboard({ subtasks, currentTask, taskClicked, handleCloseView, handleDelete, handleDeleteSubtask, handleUpdateTask, currentBoardId }) {

    const [edit, setEdit] = useState(false)
    
    const handleSetEdit = () => {
        setEdit(edit => !edit)
    }

    if (taskClicked) {
        let completed = 0;
        for (let i = 0; i < subtasks.length; i++) {
            if (subtasks[i].iscomplete) completed++
        }
        return (
            <div className='flex flex-col w-1/3 h-1/3 fixed left-1/3 top-1/4 z-10 bg-white space-y-2 border border-solid-1 border-gray rounded-md p-4'>
                <div className='flex justify-between'>
                    <p>{currentTask.task_name}</p>
                    <div className='flex space-x-2'><button onClick={handleCloseView}><img src={cross} /></button><button onClick={handleSetEdit}><img src={ellipsis} /></button></div>
                    <EditTask edit={edit} handleSetEdit={handleSetEdit} currentTask={currentTask} subtasks={subtasks} handleDelete={handleDelete} handleDeleteSubtask={handleDeleteSubtask} handleUpdateTask={handleUpdateTask} currentBoardId={currentBoardId}/>
                </div>
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
    
  
