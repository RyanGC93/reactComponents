import './styles.css'
import LandingPage from './components/LandingPage/LandingPage'
import LoginPage from './components/LoginPage/LoginPage'
import SignUpPage from './components/SignUpPage/SignUpPage'
import NotFoundPage from './components/NotFoundPage/NotFoundPage'
import React, { useState, useEffect, Fragment } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './services/firebase'
import NavBar from './components/NavBar/Navbar'
import { redirect } from 'react-router'
import { AuthProvider } from './services/AuthContext'
import ProtectedRoute from './services/ProtectedRoute'
/*
Need Navbar 
Need 404 page
Need Auth
Need to Protect Routes
Need Redux Store


Step 1 - Create Login Page
Step 2 - Create Sign Up Page
Step 3 - Create Auth Logic
>> Use Firebase as auth solution for login
>> Create logic to check if user is logged in
Step 3 - Create Landing Page
Step 4 - Create Protected Routes

Step 6 - Create Redux
*/

export default function App() {
  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       // User is signed in, see docs for a list of available properties
  //       // https://firebase.google.com/docs/reference/js/firebase.User
  //       const uid = user.uid;
  //       // ...
  //       console.log("uid", uid);
  //       setAuthenticated(true);
  //       setLoaded(true);
  //       redirect("/");
  //     } else {
  //       // User is signed out
  //       // ...
  //       console.log("user is logged out");
  //     }
  //   });
  // }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <Fragment>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <NavBar />
                  <LandingPage />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<LoginPage />} exact={true} />
            <Route path="/signup" element={<SignUpPage />} exact={true} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Fragment>
      </AuthProvider>
    </BrowserRouter>
  )
}
