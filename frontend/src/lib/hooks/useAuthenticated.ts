import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../api";
import { toast } from "@/components/ui/use-toast";
import { t } from "i18next";

export async function useAuthenticated() {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (
      localStorage.getItem("Token") == null ||
      localStorage.getItem("Token") == undefined
    ) {
      setTimeout(() => {
        navigate("/auth/login");
      }, 1000);
    }
  });

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
    if (
      (location.pathname == "/accounts" ||
        location.pathname == "/departments" ||
        location.pathname == "/view-account" ||
        location.pathname == "/view-department") &&
      (localStorage.getItem("Class") == "ServiceEmployee" ||
        localStorage.getItem("Class") == "Client")
    ) {
      navigate("/tickets");
      toast({
        variant: "destructive",
        title: t("toast.errortitle"),
        description: t("toast.unauthorized_error"),
      });
    }
  } else {
    navigate("/auth/login");
    toast({
      variant: "destructive",
      title: t("toast.errortitle"),
      description: t("toast.unauthorized_error"),
    });
  }

  return { isLoggedIn };
}
