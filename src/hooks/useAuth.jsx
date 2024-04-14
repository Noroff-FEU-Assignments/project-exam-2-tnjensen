import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useLocalStorage("token", "");
  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const login = async (data) => {
    setToken(data);
    navigate("/");
  };

  // call this function to sign out logged in user
  const logout = () => {
    setToken("");
    navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      token,
      login,
      logout,
    }),
    [token]
  );
  return <AuthContext.Provider value={{login, logout, token}}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};