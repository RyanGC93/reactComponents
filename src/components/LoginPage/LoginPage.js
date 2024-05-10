import React, { useState } from "react";
import "./LoginPage.css"; // Import CSS file for styling
import { NavLink, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebase";
import Modal from "../Modal/Modal";

const demoUser = process.env.REACT_APP_DEMO_USER;
const demoPassword = process.env.REACT_APP_DEMO_PASSWORD;

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");


  const showErrorModal = (error) => {
    setErrorMessage(error);
    setModalOpen(true);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Here you can add login functionality
    signInWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/");
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        showErrorModal(errorMessage);
        console.log(errorCode, errorMessage);
      });
    console.log("Logging in with:", username, password);
  };

  return (
    <div className="login-container">
      <img
        src="https://images.unsplash.com/photo-1505455184862-554165e5f6ba?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Woman holding yellow petaled flowers"
        className="login-image"
      />

      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" onClick={handleLogin}>
          Login
        </button>
        <div className="or-separator"></div>
        <button
          type="submit"
          onClick={(e) => {
            setUsername(demoUser);
            setPassword(demoPassword);
            handleLogin(e);
          }}
        >
          {" "}
          Demo Login
        </button>
        <h3>
          {" "}
          Don't have an account? <a href="/signup">Sign Up</a>
        </h3>
      </form>
      <Modal isOpen={isModalOpen} close={() => setModalOpen(false)}>
        <h2>Error</h2>
        <p>{errorMessage}</p>
        <p>Please try again</p>
      </Modal>
    </div>
  );
}

export default LoginPage;
