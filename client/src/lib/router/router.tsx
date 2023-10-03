import { createBrowserRouter } from "react-router-dom";
import Home from "../../components/pages/home";
import LogIn from "../../components/pages/log-in";
import Tickets from "../../components/pages/tickets";

export const router = createBrowserRouter([
  {
    path: "/log-in",
    element: <LogIn />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/tickets",
    element: <Tickets />,
  },
]);
