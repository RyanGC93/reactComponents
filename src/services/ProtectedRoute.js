import { Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'

const ProtectedRoute = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setAuthenticated(true)
      } else {
        // User is not signed in
        setAuthenticated(false)
      }
      setLoaded(true)
    })

    // Clean up the subscription on unmount
    return unsubscribe
  }, [])

  if (!loaded) {
    return <div>Loading...</div> // Optionally, show a loading spinner or similar
  }

  return authenticated ? children : <Navigate to="/login" />
}

export default ProtectedRoute
