import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../views/Dashboard/Dashboard-EXAMPLE";
import Home from "../views/Home/Home-EXAMPLE";
import About from "../views/About/About-EXAMPLE";
import MainLayout from "../layouts/MainLayout";
import App from "../App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <MainLayout>
        <App />
      </MainLayout>
    ),
  },
  {
    path: "/home",
    element: (
      <MainLayout>
        <Home />
      </MainLayout>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <MainLayout>
        <Dashboard />
      </MainLayout>
    ),
  },
  {
    path: "/about",
    element: (
      <MainLayout>
        <About />
      </MainLayout>
    ),
  },
]);
