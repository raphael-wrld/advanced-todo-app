import React from 'react'

function Task ({ task, deleteTask, startEditTask }) {
  return (
    <li>
      <div>
        <h3>{task.title}</h3>
        <p>{task.description}</p>
      </div>
      <div>
        <button onClick={() => startEditTask(task)}>Edit</button>
        <button onClick={() => deleteTask(task.id)}>Delete</button>
      </div>
    </li>
  )
}

export default Task
