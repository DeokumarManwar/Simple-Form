import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import { createUser } from "../../api/user";

export const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const RegisterHandler = async (event) => {
    event.preventDefault();
    const response = await createUser(username, password, email);
    console.log(response);
    if (response.status === 201) {
      alert("User created successfully");
      alert(`The password is ${response.data.user.password}`);
    } else {
      alert("Error creating user");
    }
  };

  return (
    <div className="text-center m-5-auto">
      <h2 className="main-title">Join us</h2>
      <h5 className="main-para">Create your personal account</h5>
      <form onSubmit={RegisterHandler}>
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
          <label>Email address</label>
          <br />
          <input
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
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
          <button type="submit" id="sub_btn" className="primary-button">
            Register
          </button>
        </p>
      </form>
      <footer>
        <p>
          <Link to="/" className="home-page-title">
            Back to Homepage
          </Link>
          .
        </p>
      </footer>
    </div>
  );
};

export default SignUpPage;
