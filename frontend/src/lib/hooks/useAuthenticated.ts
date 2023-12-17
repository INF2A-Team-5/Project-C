import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function useAuthenticated() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("Token") !== null;
  
  // function checkLogin() {
  //   setIsLoggedIn(
  //     (fetch(API_BASE_URL + "/api/accounts", getBaseQueryRequest())
  //       .then((data) => data.json())
  //       .then((accounts) =>
  //         accounts.find(
  //           (acc: any) =>
  //             acc.name == localStorage.getItem("username") &&
  //             acc.accountId.toString() == localStorage.getItem("Id") &&
  //             acc.class == localStorage.getItem("Class")
  //         ),
  //       )) != undefined,
  //   );
  // }
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
