import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import bcrypt from "bcryptjs";
import { useUser } from "../UserContext"; // Import useUser from UserContext

const Signup = () => {
  const history = useNavigate();
  const { setCurrentUser } = useUser(); // Get the setCurrentUser function from the user context

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    e.preventDefault();

    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const response = await axios.post("http://localhost:5000/users/add", {
        email,
        password: hashedPassword,
      });

      if (response.status === 200) {
        setCurrentUser(email); // Set the current user in the context
        history("/home"); // Redirect to home page after successful signup
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      <h1>Signup</h1>

      <form action="POST" onSubmit={submit}>
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
      <Link to="/">Login Page</Link>
    </div>
  );
};

export default Signup;
