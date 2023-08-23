import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";

const Logout = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useUser();
  const [logoutMessage, setLogoutMessage] = useState(null);

  const handleLogout = () => {
    // Clear any user data from context
    setCurrentUser(null);

    // Display logout message
    setLogoutMessage("Logout successful! Redirecting...");

    // Redirect to the login page after a brief delay
    setTimeout(() => {
      navigate("/");
    }, 1000); 
  };

  return (
    <div>
      {logoutMessage && <p>{logoutMessage}</p>}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
