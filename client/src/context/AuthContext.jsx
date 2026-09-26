import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = () => {
      try {
        const storedUser = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if (storedUser && token) {
          setUser(JSON.parse(storedUser));
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error loading user:", error);

        localStorage.removeItem("user");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();

    const handleAuthUpdate = () => {
      loadUser();
    };

    window.addEventListener("authUpdated", handleAuthUpdate);

    return () => {
      window.removeEventListener("authUpdated", handleAuthUpdate);
    };
  }, []);

  // LOGIN / SET USER
  const login = (userData) => {
    setUser(userData);

    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    localStorage.setItem(
      "userName",
      userData.name
    );

    localStorage.setItem(
      "userEmail",
      userData.email
    );

    localStorage.setItem(
      "userRole",
      userData.role
    );

    localStorage.setItem("isLoggedIn", "true");

    window.dispatchEvent(new Event("authUpdated"));
  };

  // LOGOUT
  const logout = () => {
    // Remove authentication data
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    localStorage.removeItem("userRole");
    localStorage.removeItem("isLoggedIn");

    // Clear user from React state
    setUser(null);

    // Tell the application that authentication changed
    window.dispatchEvent(new Event("authUpdated"));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        loading,
        isLoggedIn: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}