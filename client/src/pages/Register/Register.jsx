import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // -----------------------------
    // FRONTEND VALIDATION
    // -----------------------------

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (!password.trim()) {
      setError("Please enter your password.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      // -----------------------------
      // REGISTER API REQUEST
      // -----------------------------

      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password: password,
        }),
      });

      const data = await response.json();

      // -----------------------------
      // BACKEND ERROR
      // -----------------------------

      if (!response.ok) {
        setError(data.message || "Registration failed.");

        return;
      }

      // -----------------------------
      // SUCCESS
      // -----------------------------

      setSuccess("Registration successful! Redirecting to login...");

      // Clear form
      setName("");
      setEmail("");
      setPassword("");

      // Go to login after a short delay
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.error("Registration error:", error);

      setError(
        "Unable to connect to the server. Please make sure the backend is running.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="register-page">
      <div className="register-container">
        <div className="register-card">
          <h1>Create Account</h1>

          <p className="register-subtitle">Register to start shopping</p>

          <form onSubmit={handleRegister}>
            {/* NAME */}

            <div className="register-form-group">
              <label htmlFor="register-name">Full Name</label>

              <input
                id="register-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                autoComplete="name"
                disabled={loading}
              />
            </div>

            {/* EMAIL */}

            <div className="register-form-group">
              <label htmlFor="register-email">Email</label>

              <input
                id="register-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                autoComplete="email"
                disabled={loading}
              />
            </div>

            {/* PASSWORD */}

            <div className="register-form-group">
              <label htmlFor="register-password">Password</label>

              <input
                id="register-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                autoComplete="new-password"
                disabled={loading}
              />
            </div>

            {/* ERROR */}

            {error && <p className="register-error">{error}</p>}

            {/* SUCCESS */}

            {success && <p className="register-success">{success}</p>}

            {/* REGISTER BUTTON */}

            <button
              type="submit"
              className="register-button"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* LOGIN LINK */}

          <p className="register-login-text">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default Register;
