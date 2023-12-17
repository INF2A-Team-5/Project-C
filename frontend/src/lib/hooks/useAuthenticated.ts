import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function useAuthenticated() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("Token") !== null;
  const location = useLocation();

  useEffect(() => {
    // als users ingelogd is, set authenticated true
    if (isLoggedIn) {
      setIsAuthenticated(true);
      if (
        ((location.pathname == "/accounts" ||
          location.pathname == "/departments") &&
          localStorage.getItem("Class") == "ServiceEmployee") ||
        localStorage.getItem("Class") == "Client"
      ) {
        navigate("/tickets");
      }
    } else {
      navigate("/auth/login");
    }
  }, []);

  return { isAuthenticated };
}
