import React from 'react'

export default function Subtask({ subtasks }) {
    
  if (subtasks) {
    console.log('new subtasks here:', subtasks)
    let completed = 0;
    for (let i = 0; i < subtasks.length; i++) {
        if (subtasks[i].iscomplete) completed++
    }
    return (
        <div className='text-mediumGray text-sm'>{`${completed} of ${subtasks.length} subtasks`}</div>
      )
  }
  return null
}
