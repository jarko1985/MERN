import React from "react";
import { Link } from "react-router-dom";

export default function Nav({ setIsLoggedIn }) {
  const logoutSubmit = () => {
    localStorage.clear();
    setIsLoggedIn(false);
  };
  return (
    <header>
      <div className="logo">
        <h2>
          <Link to="/">Flights </Link>
        </h2>
      </div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/add">Add flight</Link>
        </li>
        <li onClick={logoutSubmit}>
          <Link to="/">Log out</Link>
        </li>
      </ul>
    </header>
  );
}
