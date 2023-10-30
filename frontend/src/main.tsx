import React from "react";
import ReactDOM from "react-dom/client";
import {  createBrowserRouter,
          RouterProvider,
          Route } from "react-router-dom";
import "./styles/index.css";
import "./styles/App.css";
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

//import { router } from "./lib/router/router.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "tickets",
    element: <Tickets />
  },
  {
    path: "client",
    element: <Client />
  },
  {
    path: "serviceEmployee",
    element: <ServiceEmployee />
  },
  {
    path: "admin",
    element: <Admin />
  },
  {
    path: "add-account",
    element: <AddAccount />
  },
  {
    path: "add-machine",
    element: <AddMachine />
  },
  {
    path: "add-department",
    element: <AddDepartment />
  },
  {
    path: "add-solution",
    element: <AddSolution />
  }
])


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
