import { createContext, useContext, useEffect, useState } from "react";
const LogInOutContext = createContext();

export const LogInOutProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem("isLoggedIn") === "true",
  );

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  function onLogin() {
    setIsLoggedIn(true);
  }

  function onLogout() {
    setIsLoggedIn(false);
  }
  return (
    <LogInOutContext.Provider value={{ isLoggedIn, onLogin, onLogout }}>
      {children}
    </LogInOutContext.Provider>
  );
};

export const LogInOutUse = () => {
  const context = useContext(LogInOutContext);
  if (!context) {
    throw new Error("LogInOutUse must be inside the LogInOutProvider");
  }
  return context;
};
