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
import ViewMachine from "./components/pages/view-machine";
import Solutions from "./components/pages/solutions";
import ViewAccount from "./components/pages/view-account";
import AssignedTickets from "./components/pages/assigned-tickets";
import UnassignedTickets from "./components/pages/unassigned-tickets";
import ViewDepartment from "./components/pages/view-department";


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
    path: "view-machine",
    element: <ViewMachine />,
  },
  {
    path: "view-account",
    element: <ViewAccount />,
  },
  {
    path: "edit-account",
    element: <EditAccount />,
  },
  {
    path: "view-department",
    element: <ViewDepartment />,
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
