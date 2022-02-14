import React, { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./login.css";
import axios from "axios";
import { LoginStart, LoginSuccess } from "../../context/Actions";
const Login = () => {
  // const [username, setUser] = useState("");
  // const [password, setPassword] = useState("");
  //we can use useState but we dont need to access the state more than once and we can do it without storing using useRef
  const userRef = useRef();
  const passwordRef = useRef();

  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // dispatch({ type: "LOGIN_START" });
    dispatch(LoginStart());

    try {
      const res = await axios.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });

      // dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      //this is how we use action function we defined in context folder we can replace all dispach using action function
      dispatch(LoginSuccess(res.data));
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };
  return (
    <div className="login">
      <span className="login-title">LOGIN</span>
      <form className="login-form" onSubmit={handleSubmit}>
        <label>username</label>
        <input
          type="text"
          placeholder="Enter Your username"
          className="login-input"
          ref={userRef}
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter Your Password"
          className="login-input"
          ref={passwordRef}
        />

        <button className="login-button" type="submit" disabled={isFetching}>
          Login
        </button>
      </form>
      <button className="loginRegister-button">
        <Link to="/register" className="link">
          Register
        </Link>
      </button>
    </div>
  );
};

export default Login;
