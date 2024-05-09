import React from "react";
import "./SignUpPage.css";

function SignUpPage() {
  return (
    <div className="signup-container">
      <h2 className="signup-header">Sign Up</h2>
      <form className="signup-form">
        <input type="text" placeholder="Name" className="signup-input" />
        <input type="email" placeholder="Email" className="signup-input" />
        <input
          type="password"
          placeholder="Password"
          className="signup-input"
        />
        <button type="submit" className="signup-button">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUpPage;
