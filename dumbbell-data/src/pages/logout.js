import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";
import "./logout.css"; // Import your CSS file

const Logout = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useUser();
  const [logoutMessage, setLogoutMessage] = useState(null);

  const handleLogout = () => {
    // Clear any user data from context
    setCurrentUser(null);
  
    // Display logout message
    setLogoutMessage("Logout successful! Redirecting...");
  
    // Delay the redirection using setTimeout
    setTimeout(() => {
      // Redirect to the login page
      navigate("/");
    }, 1000); // Delay for 1 second (1000 milliseconds)
  };
  

  return (
    <div className="logout-container">
      {logoutMessage && <p className="logout-message">{logoutMessage}</p>}
      <p>Thank you for visiting Dumbbell Data!</p>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Logout;
