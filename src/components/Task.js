// src/components/Task.js
import React, { useState } from 'react'
import { firestore } from '../firebase'
import { doc, deleteDoc, updateDoc } from 'firebase/firestore'

const Task = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description)

  const handleUpdateTask = async () => {
    if (title.trim() === '' || description.trim() === '') {
      alert('Title and Description cannot be empty')
      return
    }

    try {
      const taskDoc = doc(firestore, 'tasks', task.id)
      await updateDoc(taskDoc, {
        title,
        description
      })
      setIsEditing(false) // Move this inside the try block to ensure it only runs after successful update
    } catch (error) {
      console.error('Error updating task:', error)
    }
  }

  const handleDeleteTask = async () => {
    try {
      const taskDoc = doc(firestore, 'tasks', task.id)
      await deleteDoc(taskDoc)
    } catch (error) {
      console.error('Error deleting task:', error)
    }
  }

  return (
    <div>
      {isEditing ? (
        <div>
          <input
            type='text'
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
          ></textarea>
          <button onClick={handleUpdateTask}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDeleteTask}>Delete</button>
        </div>
      )}
    </div>
  )
}

export default Task
