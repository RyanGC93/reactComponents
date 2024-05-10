import React from 'react'
import './Navbar.css' // Importing the CSS file for styling
import { getAuth, signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

function NavBar() {
  const auth = getAuth()
  const navigate = useNavigate()

  const logout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log('Logout successful')
        navigate('/login')
      })
      .catch((error) => {
        // An error happened.
        console.log('Logout failed', error)
      })
  }

  return (
    <nav className="navbar">
      <ul className="nav-items">
        <li className="nav-item">
          <a href="/">Home</a>
        </li>
        <li className="nav-item">
          <button onClick={logout}>Logout</button>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar
