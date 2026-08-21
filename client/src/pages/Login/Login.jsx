import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const location = useLocation();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    setError("");

    // Check email
    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    // Check password
    if (!password.trim()) {
      setError("Please enter your password.");
      return;
    }

    localStorage.setItem("isLoggedIn", "true");

    localStorage.setItem("userEmail", email);

    const from = location.state?.from || "/";

    navigate(from, {
      replace: true,
    });
  };

  return (
    <main className="login-page">
      <div className="login-container">
        <div className="login-card">
          <h1>Welcome Back</h1>

          <p className="login-subtitle">Login to continue shopping</p>

          <form onSubmit={handleLogin}>
            {/* EMAIL */}

            <div className="login-form-group">
              <label>Email</label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>

            {/* PASSWORD */}

            <div className="login-form-group">
              <label>Password</label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>

            {/* ERROR */}

            {error && <p className="login-error">{error}</p>}

            {/* LOGIN BUTTON */}

            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default Login;
