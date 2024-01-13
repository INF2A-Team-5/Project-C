import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/globals.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import EditAccount from "./components/pages/edit-account";
import "./translations/i18n";
import ViewTicket from "./components/pages/view-ticket";
import LogIn from "./components/pages/auth/log-in";
import CreateTickets from "./components/pages/create-ticket";
import Tickets from "./components/pages/tickets";
import Machines from "./components/pages/machines";
import Departments from "./components/pages/departments";
import Accounts from "./components/pages/accounts";
import Solutions from "./components/pages/solutions";
import AssignedTickets from "./components/pages/assigned-tickets";
import UnassignedTickets from "./components/pages/unassigned-tickets";
import ClosedTickets from "./components/pages/closed-tickets";

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

  /** OTHER */
  {
    path: "tickets",
    element: <Tickets />,
  },
  {
    path: "assigned-tickets",
    element: <AssignedTickets/>,
  },
  {
    path: "unassigned-tickets",
    element: <UnassignedTickets/>,
  },
  {
    path: "closed-tickets",
    element: <ClosedTickets/>,
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
  {
    path: "solutions",
    element: <Solutions />,
  },
  {
    path: "create-ticket",
    element: <CreateTickets />,
  },
  {
    path: "view-ticket",
    element: <ViewTicket />,
  },
  {
    path: "edit-account",
    element: <EditAccount />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
