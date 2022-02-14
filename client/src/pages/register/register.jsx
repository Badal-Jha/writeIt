import React, { useState } from "react";
import "./register.css";
import { Link } from "react-router-dom";
import axios from "axios";
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post("/auth/register", {
        username,
        email,
        password,
      });
      if (res.data) window.location.replace("/login");
      console.log(res);
    } catch (err) {
      setError(true);
    }
  };
  return (
    <div className="register">
      <span className="register-title">Register</span>
      <form className="register-form" onSubmit={(e) => handleSubmit(e)}>
        <label>Username</label>
        <input
          type="text"
          placeholder="Enter Your Username"
          className="register-input"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter Your Email"
          className="register-input"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter Your Password"
          className="register-input"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="register-button" type="submit">
          register
        </button>
      </form>
      <button className="registerRegister-button">
        <Link to="/login" className="link">
          Login
        </Link>
      </button>
      {error && <span style={{ color: " red" }}>something went wrong</span>}
    </div>
  );
};

export default Register;
