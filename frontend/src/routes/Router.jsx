import React from "react";
import App from "../App";
import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../views/Dashboard/Dashboard-EXAMPLE";
import Home from "../views/Home/Home-EXAMPLE";
import About from "../views/About/About-EXAMPLE";

export const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/home", element: <Home /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/about", element: <About /> },
]);
