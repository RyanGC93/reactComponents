import React, {useState} from 'react'
import './Navbar.css' 
import { getAuth, signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import Modal from "../Modal/Modal"

function NavBar() {
  const [isModalOpen, setModalOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const auth = getAuth()
  const navigate = useNavigate()

  const showErrorModal = (error) => {
    setErrorMessage(error)
    setModalOpen(true)
  }

  const logout = () => {
    signOut(auth)
      .then(() => {
        navigate('/login')
      })
      .catch((error) => {
        showErrorModal(error.message)
        console.error(error.code, error.message)
      })
  }

  return (
    <>
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
    <Modal isOpen={isModalOpen} close={() => setModalOpen(false)}>
        <h2>Error</h2>
        <p>{errorMessage}</p>
        <p>Logout Unsuccessful</p>
      </Modal>
    </>
  )
}

export default NavBar
