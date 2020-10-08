import React, { useState } from "react";
import axios from "axios";

export default function Login({ setIsLoggedIn }) {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [err, setError] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setError("");
  };
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("/users/register", {
        username: user.name,
        email: user.email,
        password: user.password,
      });
      setUser({ name: "", email: "", password: "" });
      setError(result.data.msg);
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("/users/login", {
        email: user.email,
        password: user.password,
      });
      setUser({ name: "", email: "", password: "" });
      localStorage.setItem("tokenStore", result.data.token);
      setIsLoggedIn(true);
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  const [onLogin, setOnLogin] = useState(false);
  const style = {
    visibility: onLogin ? "visible" : "hidden",
    opacity: onLogin ? 1 : 0,
  };
  return (
    <section className="login-page">
      <div className="login add-flight">
        <h2>Login</h2>
        <form onSubmit={handleLoginSubmit}>
          <input
            value={user.email}
            type="email"
            name="email"
            id="login-email"
            placeholder="Email"
            required
            onChange={handleChange}
          />
          <input
            value={user.password}
            type="password"
            name="password"
            id="login-password"
            placeholder="Password"
            autoComplete="true"
            required
            onChange={handleChange}
          />
          <button type="submit">Login</button>
          <p>
            Don't Have an Account?
            <span onClick={() => setOnLogin(true)}>Register here</span>
          </p>
          <h3>{err}</h3>
        </form>
      </div>
      <div className="register add-flight" style={style}>
        <h2>Register</h2>
        <form onSubmit={handleRegisterSubmit}>
          <input
            value={user.name}
            type="text"
            name="name"
            id="register-name"
            placeholder="Name"
            required
            onChange={handleChange}
          />
          <input
            value={user.email}
            type="email"
            name="email"
            id="register-email"
            placeholder="Email"
            required
            onChange={handleChange}
          />
          <input
            value={user.password}
            type="password"
            name="password"
            id="register-password"
            placeholder="Password"
            autoComplete="true"
            required
            onChange={handleChange}
          />
          <button type="submit">Register</button>
          <p>
            Have an Account?
            <span onClick={() => setOnLogin(false)}>Login here</span>
          </p>
          <h3>{err}</h3>
        </form>
      </div>
    </section>
  );
}
