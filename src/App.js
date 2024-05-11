import './styles.css'

import LandingPage from './components/LandingPage/LandingPage'

import React, {  Fragment } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'


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
            <Route path="*" element={<LandingPage />} />
          </Routes>
        </Fragment>
      </AuthProvider>
    </BrowserRouter>
  )
}
