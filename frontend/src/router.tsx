import { createBrowserRouter } from "react-router-dom";
import Client from "./components/pages/client";
import LogIn from "./components/pages/log-in";
import Tickets from "./components/pages/tickets";
import App from "./App";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <LogIn/>},
      { path: "client", element: <Client/>},
      // { path: "", element: <LogIn/>},
    ]
  },
  {
    path: "/",
    element: <Client />,
  },
  {
    path: "/tickets",
    element: <Tickets />,
  },
]);
