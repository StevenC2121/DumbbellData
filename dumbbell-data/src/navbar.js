import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { NavLink } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
      <img src="/dbdata-logo.png" alt="" width="43.75" height="35" className="d-inline-block align-text-top"></img>
        <NavLink className="navbar-brand" to="/">Dumbbell Data</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/weightlifting">Weightlifting</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/cardio">Cardio</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/edit-exercise">Edit Exercise</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/new-user">Account</NavLink>
            </li>
            <li className="nav-item">
              <div className="dropdown">
                <NavLink className="nav-link dropdown-toggle" to="/graphs-stats" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Graphs/Stats
                </NavLink>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><NavLink className="dropdown-item" to="/wl-stats">Weightlifting</NavLink></li>
                  <li><NavLink className="dropdown-item" to="/cardio-stats">Cardio</NavLink></li>
                </ul>
              </div>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <div className="input-group">
                <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success" type="submit">Search</button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
