import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import App from "../App";
import ScriptsLibraryView from "../views/ScriptsLibraryView/ScriptsLibraryView";

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
    path: "/scriptslibrary",
    element: (
      <MainLayout>
        <ScriptsLibraryView />
      </MainLayout>
    ),
  },
]);
