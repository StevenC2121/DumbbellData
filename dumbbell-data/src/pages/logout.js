import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";

const Logout = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useUser();

  const handleLogout = () => {
    // Clear any user data from context
    setCurrentUser(null);

    // Redirect to the login page
    navigate("/login");
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
