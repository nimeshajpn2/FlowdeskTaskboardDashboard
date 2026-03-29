import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar: React.FC = () => {
  const isLoggedIn = document.cookie.includes("jwtToken");

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          Flowdesk
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/ProjectsPage">
                  Projects
              </NavLink>
            </li>
            {!isLoggedIn && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/LoginPage">
                  Logout
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;