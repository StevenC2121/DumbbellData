import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import bcrypt from "bcryptjs"; 
import { useUser } from "../UserContext";
import "./login.css"; 


const Login = () => {
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setCurrentUser } = useUser();

  async function submit(e) {
    e.preventDefault();

    try {
      const response = await axios.get("http://localhost:5000/users");
      const users = response.data;

      const user = users.find((u) => u.email === email);
      if (user) {
        // Compare the entered password with the hashed password using bcryptjs
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (isPasswordCorrect) {
          setCurrentUser(user.email);
          history("/home", { state: { id: email } });
        } else {
          alert("Incorrect password");
        }
      } else {
        alert("User not found");
      }
    } catch (e) {
      alert("Login Error: Something went wrong");
      console.log(e);
    }
  }

  return (
    <div>
      <div className="login-container">
      <h1>Welcome back!</h1>
      <div className="login-page">
        <div className="login-box">
          <h2>Login</h2>
          <form onSubmit={submit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
            />
            <input type="submit" />
          </form>
          <div className="signup-link">
            <p>If you are new:</p>
            <Link to="/signup">Signup Page</Link>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Login;
