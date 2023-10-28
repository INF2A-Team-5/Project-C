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
import './translations/i18n';


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
])


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
