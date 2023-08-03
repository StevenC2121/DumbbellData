import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import bcrypt from "bcryptjs"

const Login = () => {
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    e.preventDefault();

    try {
      const response = await axios.get("http://localhost:5000/users");
      const users = response.data;

      const user = users.find((u) => u.email === email);
      if (user) {
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (isPasswordCorrect) {
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
      <h1>Login</h1>

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
      <br />
      <p>OR</p>
      <Link to="/signup">Signup Page</Link>
    </div>
  );
};

export default Login;
