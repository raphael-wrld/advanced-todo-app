import React, { useState, useEffect } from 'react'
import {
  firestore,
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc
} from '../firebase'
import { onSnapshot } from 'firebase/firestore' // Import onSnapshot from firebase/firestore
import Task from './Task'

function TaskList () {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [editId, setEditId] = useState(null)
  const [editTitle, setEditTitle] = useState('')
  const [editDescription, setEditDescription] = useState('')

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(firestore, 'tasks'),
      querySnapshot => {
        setTasks(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
      }
    )
    return () => unsubscribe()
  }, [])

  const addTask = async () => {
    if (title && description) {
      const task = { title, description }
      try {
        const docRef = await addDoc(collection(firestore, 'tasks'), task)
        console.log('Document written with ID: ', docRef.id)
        setTitle('')
        setDescription('')
      } catch (e) {
        console.error('Error adding document: ', e)
      }
    } else {
      console.log('Title or description is missing')
    }
  }

  const deleteTask = async id => {
    await deleteDoc(doc(firestore, 'tasks', id))
  }

  const startEditTask = task => {
    setEditId(task.id)
    setEditTitle(task.title)
    setEditDescription(task.description)
  }

  const saveEditTask = async () => {
    if (editTitle && editDescription) {
      await updateDoc(doc(firestore, 'tasks', editId), {
        title: editTitle,
        description: editDescription
      })
      setEditId(null)
      setEditTitle('')
      setEditDescription('')
    }
  }

  return (
    <div>
      <input
        type='text'
        placeholder='Task title'
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <textarea
        placeholder='Task description'
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map(task => (
          <Task
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            startEditTask={startEditTask}
          />
        ))}
      </ul>
      {editId && (
        <div>
          <input
            type='text'
            placeholder='Edit title'
            value={editTitle}
            onChange={e => setEditTitle(e.target.value)}
          />
          <textarea
            placeholder='Edit description'
            value={editDescription}
            onChange={e => setEditDescription(e.target.value)}
          />
          <button onClick={saveEditTask}>Save</button>
          <button onClick={() => setEditId(null)}>Cancel</button>
        </div>
      )}
    </div>
  )
}

export default TaskList
