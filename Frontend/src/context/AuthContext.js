import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store user info or JWT

  const login = (userData) => {
    setUser(userData);
    // optionally store token in localStorage or cookie
  };

  const logout = () => {
    setUser(null);
    // remove token if stored
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);
