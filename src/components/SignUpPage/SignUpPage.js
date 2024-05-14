import React, { useState } from 'react'
import './SignUpPage.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../services/firebase'
import Modal from '../Modal/Modal'

function SignUpPage() {
  const navigate = useNavigate()
  const [isModalOpen, setModalOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const showErrorModal = (error) => {
    setErrorMessage(error)
    setModalOpen(true)
  }

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
        console.log(user)
        navigate('/login')
        // ...
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        showErrorModal(errorMessage)
        console.log(errorCode, errorMessage)
        // ..
      })
  }
  return (
    <div className="signup-container">
        <img
        src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGxhbnRpbmd8ZW58MHx8MHx8fDA%3D"
        alt="Woman holding yellow petaled flowers"
        className="login-image"
      />
      <form className="signup-form">
      <h2 >Sign Up</h2>
        <input type="text" placeholder="Name" className="signup-input" />
        <input
          type="email"
          placeholder="Email"
          label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="signup-input"
        />
        <input
          type="password"
          placeholder="Password"
          className="signup-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" onClick={onSubmit} className="signup-button">
          Sign Up
        </button>
        <NavLink to="/login" className="signup-link">
          Already have an account? Log In
        </NavLink>
      </form>
      <Modal isOpen={isModalOpen} close={() => setModalOpen(false)}>
        <h2>Error</h2>
        <p>{errorMessage}</p>
      </Modal>
    </div>
  )
}

export default SignUpPage
