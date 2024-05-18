import React, { useState } from 'react'
import './LoginPage.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../services/firebase'
import Modal from '../Modal/Modal'

function LoginPage() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('demo@demo.com')
  const [password, setPassword] = useState('password')
  const [isModalOpen, setModalOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const showErrorModal = (error) => {
    setErrorMessage(error)
    setModalOpen(true)
  }

  const handleLogin = (e) => {
    e.preventDefault()
    console.log('Logging in with:', username, password)
    signInWithEmailAndPassword(auth, username, password)
      .then(() => {
        navigate('/')
      })
      .catch((error) => {
        showErrorModal(error.message)
        console.error(error.code, error.message)
      })
  }

  const handleDemoLogin = (e) => {
    e.preventDefault()
    setUsername(process.env.REACT_APP_DEMO_USER)
    setPassword(process.env.REACT_APP_DEMO_PASSWORD)
    handleLogin(e)
  }

  return (
    <div className="login-container">
      <img
        src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGxhbnRpbmd8ZW58MHx8MHx8fDA%3D"
        alt="Woman holding yellow petaled flowers"
        className="login-image"
      />
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
        <div className="or-separator"></div>
        <h3>
          Don't have an account? <NavLink to="/signup">Sign Up</NavLink>
        </h3>
      </form>
      <Modal isOpen={isModalOpen} close={() => setModalOpen(false)}>
        <h2>Error</h2>
        <p>{errorMessage}</p>
        <p>Please try again</p>
      </Modal>
    </div>
  )
}

export default LoginPage
