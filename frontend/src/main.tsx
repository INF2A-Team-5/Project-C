import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/globals.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Client from "./components/pages/--client";
import ServiceEmployee from "./components/pages/--service-employee";
import Admin from "./components/pages/--admin";
import EditAccount from "./components/foundations/edit-account";
import "./translations/i18n";
import ViewTicket from "./components/pages/view-ticket";

import LogIn from "./components/pages/auth/log-in";
import ForgotPassword from "./components/pages/auth/--forgot-password";
import CreateTickets from "./components/pages/create-ticket";
import Tickets from "./components/pages/tickets";
import Machines from "./components/pages/machines";
import Departments from "./components/pages/departments";
import Accounts from "./components/pages/accounts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },

  /** AUTH */
  {
    path: "/auth/login",
    element: <LogIn />,
  },
  {
    path: "/auth/forgot-password",
    element: <ForgotPassword />,
  },

  /** OTHER */
  {
    path: "create-ticket",
    element: <CreateTickets />,
  },
  {
    path: "client",
    element: <Client />,
  },
  {
    path: "serviceEmployee",
    element: <ServiceEmployee />,
  },
  {
    path: "admin",
    element: <Admin />,
  },
  {
    path: "edit-account",
    element: <EditAccount />,
  },
  {
    path: "view-ticket",
    element: <ViewTicket />,
  },
  {
    path: "tickets",
    element: <Tickets />,
  },
  {
    path: "machines",
    element: <Machines />,
  },
  {
    path: "departments",
    element: <Departments />,
  },
  {
    path: "accounts",
    element: <Accounts />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
