// src/components/TaskList.js
import React, { useEffect, useState } from 'react'
import { firestore } from '../firebase'
import { collection, onSnapshot } from 'firebase/firestore'
import Task from './Task'

const TaskList = () => {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const tasksCollection = collection(firestore, 'tasks')
    const unsubscribe = onSnapshot(tasksCollection, snapshot => {
      const fetchedTasks = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setTasks(fetchedTasks)
    })

    return () => unsubscribe()
  }, [])

  return (
    <div>
      {tasks.map(task => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  )
}

export default TaskList
