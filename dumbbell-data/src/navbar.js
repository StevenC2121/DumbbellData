import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { NavLink } from 'react-router-dom';
import "./custom-navbar.css"

const NavigationBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/home">
          <img src="/dbdata-logo.png" alt="" width="43.75" height="35" className="d-inline-block align-text-top"></img>
          Dumbbell Data
        </NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="navbar-center"> {/* Add a custom CSS class for centering */}
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link mx-2" to="/weightlifting">Weightlifting</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link mx-2" to="/wl-stats">Graphs/Stats</NavLink>
              </li>
              <li className="nav-item">
                <div className="dropdown">
                  <NavLink className="nav-link dropdown-toggle mx-2" to="/graphs-stats" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Account
                  </NavLink>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><NavLink className="dropdown-item" to="/">Login</NavLink></li>
                    <li><NavLink className="dropdown-item" to="/signup">Sign Up</NavLink></li>
                    <li><NavLink className="dropdown-item" to="/logout">Logout</NavLink></li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
