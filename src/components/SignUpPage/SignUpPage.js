import React, { useState } from "react";
import "./SignUpPage.css";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebase";

function SignUpPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        navigate("/login");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
      });
  };
  return (
    <div className="signup-container">
      <h2 className="signup-header">Sign Up</h2>
      <form className="signup-form">
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
    </div>
  );
}

export default SignUpPage;
