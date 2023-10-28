import React, { useState } from "react";
import { Link } from "react-router-dom";

import "../../App.css";
import { loginUser } from "../../api/user";

export const SignInPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const LoginHandler = async (event) => {
    event.preventDefault();
    const response = await loginUser(username, password);
    console.log(response);
    if (response.status === 200) {
      alert("User logged in successfully");
      console.log(response.data.user);
      alert(`The password is ${response.data.user.password}`);
    } else {
      alert("Error logging in user");
    }
  };

  return (
    <div className="text-center m-5-auto">
      <h2>Sign in to us</h2>
      <form onSubmit={LoginHandler}>
        <p>
          <label>Username</label>
          <br />
          <input
            type="text"
            name="first_name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </p>
        <p>
          <label>Password</label>
          <br />
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </p>
        <p>
          <button id="sub_btn" type="submit">
            Login
          </button>
        </p>
      </form>
      <footer>
        <p>
          First time? <Link to="/register">Create an account</Link>.
        </p>
        <p>
          <Link to="/">Back to Homepage</Link>.
        </p>
      </footer>
    </div>
  );
};
