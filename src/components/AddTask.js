// src/components/AddTask.js
import React, { useState } from 'react'
import { firestore } from '../firebase'
import { collection, addDoc } from 'firebase/firestore'

const AddTask = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleAddTask = async e => {
    e.preventDefault()
    if (title.trim() === '' || description.trim() === '') {
      alert('Title and Description cannot be empty')
      return
    }

    try {
      const tasksCollection = collection(firestore, 'tasks')
      await addDoc(tasksCollection, {
        title,
        description
      })
      setTitle('')
      setDescription('')
    } catch (error) {
      console.error('Error adding task:', error)
    }
  }

  return (
    <div>
      <h2>Add Task</h2>
      <form onSubmit={handleAddTask}>
        <input
          type='text'
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder='Title'
        />
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder='Description'
        ></textarea>
        <button type='submit'>Add Task</button>
      </form>
    </div>
  )
}

export default AddTask
