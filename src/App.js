import './styles.css'
import LandingPage from './components/LandingPage/LandingPage'
import LoginPage from './components/LoginPage/LoginPage'
import SignUpPage from './components/SignUpPage/SignUpPage'
import NotFoundPage from './components/NotFoundPage/NotFoundPage'
import React, { Fragment } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar/Navbar'
import { AuthProvider } from './services/AuthContext'
import ProtectedRoute from './services/ProtectedRoute'

export default function App() {
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
