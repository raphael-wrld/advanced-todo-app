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
      setTitle('') // Clear the title field
      setDescription('') // Clear the description field
    } catch (error) {
      console.error('Error adding task:', error)
    }
  }

  return (
    <div className='max-w-lg mx-auto p-4 bg-white rounded-md shadow-md'>
      <h2 className='text-2xl font-semibold mb-4'>Add Task</h2>
      <form onSubmit={handleAddTask}>
        <input
          type='text'
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder='Title'
          className='border rounded-md p-2 w-full mb-4'
        />
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder='Description'
          className='border rounded-md p-2 w-full mb-4'
        ></textarea>
        <button
          type='submit'
          className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300'
        >
          Add Task
        </button>
      </form>
    </div>
  )
}

export default AddTask
