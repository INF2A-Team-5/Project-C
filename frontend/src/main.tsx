import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles/index.css";
import "./styles/foundations.css";
import App from "./App";
import Tickets from "./components/pages/tickets";
import Client from "./components/pages/client";
import ServiceEmployee from "./components/pages/serviceEmployee";
import Admin from "./components/pages/admin";
import AddAccount from "./components/pages/addAccount";
import AddMachine from "./components/pages/addMachine";
import AddDepartment from "./components/pages/addDepartment";
import AddSolution from "./components/pages/AddSolution";
import EditAccount from "./components/pages/EditAccount";
import "./translations/i18n";
import LogIn from "./components/pages/auth/log-in";
import Register from "./components/pages/auth/register";
import ForgotPassword from "./components/pages/auth/forgot-password";

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
    path: "/auth/register",
    element: <Register />,
  },
  {
    path: "/auth/forgot-password",
    element: <ForgotPassword />,
  },

  /** OTHER */
  {
    path: "tickets",
    element: <Tickets />,
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
    path: "add-account",
    element: <AddAccount />,
  },
  {
    path: "add-machine",
    element: <AddMachine />,
  },
  {
    path: "add-department",
    element: <AddDepartment />,
  },
  {
    path: "add-solution",
    element: <AddSolution />,
  },
  {
    path: "edit-account",
    element: <EditAccount />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
