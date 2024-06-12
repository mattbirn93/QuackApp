import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import App from "../App";
import ScriptsLibraryView from "../views/ScriptsLibraryView/ScriptsLibraryView";
import NotFound from "../views/NotFound";

const routes = [
  {
    path: "/",
    element: (
      <MainLayout>
        <App />
      </MainLayout>
    ),
  },
  {
    path: "/scriptslibrary",
    element: (
      <MainLayout>
        <ScriptsLibraryView />
      </MainLayout>
    ),
  },
  {
    path: "*",
    element: (
      <MainLayout>
        <NotFound />
      </MainLayout>
    ),
  },
];

export const router = createBrowserRouter(routes);
