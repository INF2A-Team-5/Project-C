import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function useAuthenticated() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // als users ingelogd is, set authenticated true
    const isLoggedIn = false;
    if (isLoggedIn) {
      setIsAuthenticated(true);
    } else {
      navigate("/auth/login");
    }
  }, []);

  return { isAuthenticated };
}
