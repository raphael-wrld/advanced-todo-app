// src/components/Register.js
import React, { useState } from 'react'
import { auth } from '../firebase'

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = async e => {
    e.preventDefault()
    try {
      await auth.createUserWithEmailAndPassword(email, password)
    } catch (error) {
      console.error('Error creating account:', error)
    }
  }

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type='email'
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder='Email'
        />
        <input
          type='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder='Password'
        />
        <button type='submit'>Register</button>
      </form>
    </div>
  )
}

export default Register
