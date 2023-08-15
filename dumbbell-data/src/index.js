import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot
import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from "./UserContext"; // Adjust the path

import App from "./App"; // Your main app component

const rootElement = document.getElementById("root");
const root = createRoot(rootElement); // Create a root
root.render(
  <Router>
    <UserProvider>
      <App />
    </UserProvider>
  </Router>
);
