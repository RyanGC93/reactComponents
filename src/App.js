import "./styles.css";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage/LoginPage";
import SignUpPage from "./components/SignUpPage/SignUpPage";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

/*
Need Navbar 
Need 404 page
Need Auth
Need to Protect Routes
Need Redux Store


Step 1 - Create Login Page
Step 2 - Create Sign Up Page
Step 3 - Create Landing Page
Step 4 - Create Protected Routes
Step 5 - Create Auth
Step 6 - Create Redux
*/

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} exact={true} />
      </Routes>
    </BrowserRouter>
  );
}
