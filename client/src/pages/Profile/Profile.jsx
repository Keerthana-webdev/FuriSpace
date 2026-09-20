import { useEffect, useState } from "react";
import "./Profile.css";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("You are not logged in.");
          setLoading(false);
          return;
        }

        const response = await fetch("http://localhost:5000/api/auth/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Failed to load profile.");
          return;
        }

        setUser(data.user);

        // Keep localStorage user data updated
        localStorage.setItem("user", JSON.stringify(data.user));

        localStorage.setItem("userName", data.user.name);

        localStorage.setItem("userEmail", data.user.email);

        localStorage.setItem("userRole", data.user.role);
      } catch (error) {
        console.error("Profile error:", error);

        setError("Unable to connect to the server.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <main className="profile-page">
        <div className="profile-loading">
          <div className="profile-spinner"></div>
          <p>Loading your profile...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="profile-page">
        <div className="profile-error-card">
          <h2>Unable to Load Profile</h2>
          <p>{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="profile-page">
      <div className="profile-container">
        {/* Header */}
        <div className="profile-header">
          <div className="profile-avatar">
            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>

          <div>
            <h1>My Profile</h1>
            <p>Manage your FurniSpace account</p>
          </div>
        </div>

        {/* Profile Card */}
        <div className="profile-card">
          <div className="profile-card-title">
            <h2>Personal Information</h2>
            <span className="profile-role">
              {user?.role === "admin" ? "Admin" : "Customer"}
            </span>
          </div>

          {/* Name */}
          <div className="profile-info">
            <div className="profile-info-icon">👤</div>

            <div className="profile-info-content">
              <span className="profile-label">Full Name</span>

              <span className="profile-value">
                {user?.name || "Not provided"}
              </span>
            </div>
          </div>

          {/* Email */}
          <div className="profile-info">
            <div className="profile-info-icon">✉️</div>

            <div className="profile-info-content">
              <span className="profile-label">Email Address</span>

              <span className="profile-value">
                {user?.email || "Not provided"}
              </span>
            </div>
          </div>

          {/* Phone */}
          <div className="profile-info">
            <div className="profile-info-icon">📞</div>

            <div className="profile-info-content">
              <span className="profile-label">Phone</span>

              <span className="profile-value">
                {user?.phone || "Not provided"}
              </span>
            </div>
          </div>

          {/* Address */}
          <div className="profile-info">
            <div className="profile-info-icon">📍</div>

            <div className="profile-info-content">
              <span className="profile-label">Address</span>

              <span className="profile-value">
                {user?.address || "Not provided"}
              </span>
            </div>
          </div>
        </div>

        {/* Account Information */}
        <div className="profile-card account-card">
          <div className="profile-card-title">
            <h2>Account Information</h2>
          </div>

          <div className="account-row">
            <span>Account Type</span>

            <strong>
              {user?.role === "admin" ? "Administrator" : "Customer"}
            </strong>
          </div>

          <div className="account-row">
            <span>Account Status</span>

            <span className="status-active">Active</span>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Profile;
