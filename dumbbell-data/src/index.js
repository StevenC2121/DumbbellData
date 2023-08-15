import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from "./UserContext"; // Adjust the path

import App from "./App"; // Your main app component

ReactDOM.render(
  <Router>
    <UserProvider>
      <App />
    </UserProvider>
  </Router>,
  document.getElementById("root")
);
