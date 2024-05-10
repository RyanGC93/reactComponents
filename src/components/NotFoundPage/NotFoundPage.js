// https://images.unsplash.com/photo-1531704614325-a9d601284144?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D

import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.css'; // Import the custom CSS

function NotFoundPage() {
  return (
    <div className="not-found-container">
      <h1>404</h1>
      <h2>Oops! Page not found.</h2>
      <p>We can't seem to find the page you're looking for.</p>
      <Link to="/" className="home-link">Go Home</Link>
    </div>
  );
}

export default NotFoundPage;
