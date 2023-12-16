import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function useAuthenticated() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("Token") !== null;

  useEffect(() => {
    // als users ingelogd is, set authenticated true
    if (isLoggedIn) {
      setIsAuthenticated(true);
    } else {
      navigate("/auth/login");
    }
  }, []);

  return { isAuthenticated };
}
