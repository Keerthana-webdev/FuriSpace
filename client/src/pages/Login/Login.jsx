import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (!password.trim()) {
      setError("Please enter your password.");
      return;
    }

    try {
      setLoading(true);
      
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password: password,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "Invalid email or password.");

        return;
      }

      if (!data.token || !data.user) {
        setError("Login failed. Invalid server response.");

        return;
      }

      localStorage.setItem("token", data.token);

      // -----------------------------
      // SAVE USER INFORMATION
      // -----------------------------
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("userEmail", data.user.email);
      localStorage.setItem("userName", data.user.name);
      localStorage.setItem("userRole", data.user.role);

      // Keep this temporarily for
      // existing parts of the project.
      localStorage.setItem("isLoggedIn", "true");

      // Notify other components/pages
      window.dispatchEvent(new Event("authUpdated"));

      // -----------------------------
      // REDIRECT
      // -----------------------------

      const from = location.state?.from;

      // Admin login
      if (data.user.role === "admin") {
        navigate("/admin", {
          replace: true,
        });

        return;
      }

      // Customer login
      navigate(from || "/", {
        replace: true,
      });
    } catch (error) {
      console.error("Login error:", error);

      setError(
        "Unable to connect to the server. Please make sure the backend is running.",
      );
    } finally {
      setLoading(false);
    }
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
              <label htmlFor="login-email">Email</label>

              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                autoComplete="email"
                disabled={loading}
              />
            </div>

            {/* PASSWORD */}

            <div className="login-form-group">
              <label htmlFor="login-password">Password</label>

              <input
                id="login-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
                disabled={loading}
              />
            </div>

            {/* ERROR */}

            {error && <p className="login-error">{error}</p>}

            {/* LOGIN BUTTON */}

            <button type="submit" className="login-button" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default Login;
