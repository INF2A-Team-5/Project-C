import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../api";
import { toast } from "@/components/ui/use-toast";

export async function useAuthenticated() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isLoggedIn = await fetch(
    API_BASE_URL + "/api/Auth/auth?token=" + localStorage.getItem("Token"),
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    },
  ).then((data) => data.json());
  if (isLoggedIn) {
    setIsAuthenticated(true);
    if (
      (location.pathname == "/accounts" ||
        location.pathname == "/departments") &&
      (localStorage.getItem("Class") == "ServiceEmployee" ||
        localStorage.getItem("Class") == "Client")
    ) {
      navigate("/tickets");
    }
  } else {
    navigate("/auth/login");
    toast({
      variant: "destructive",
      title: "Error! Something went wrong.",
      description: "Unauthorized",
    });
  }

  return { isAuthenticated };
}
