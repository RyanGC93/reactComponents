import React from 'react'
import firebase from './firebase'
import { auth } from './firebase'

const GoogleSignIn = () => {
  const handleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result)
        // You can extract the Google Access Token and use it to access the Google API.
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return <button onClick={handleSignIn}>Sign in with Google</button>
}

export default GoogleSignIn
