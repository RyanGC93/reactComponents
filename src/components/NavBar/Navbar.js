import React from "react";
import "./Navbar.css"; // Importing the CSS file for styling

function NavBar() {
  return (
    <nav className="navbar">
      <ul className="nav-items">
        <li className="nav-item">
          <a href="/">Home</a>
        </li>
        <li className="nav-item">
          <a href="/logout">Logout</a>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
