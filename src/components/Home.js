// src/components/Home.js
import React from 'react'
import AddTask from './AddTask'
import TaskList from './TaskList'

const Home = () => {
  return (
    <div>
      <h1>Advanced To-Do App</h1>
      <AddTask />
      <TaskList />
    </div>
  )
}

export default Home
