// src/router.jsx

import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import App from "../App";
import LoginView from "../views/LoginView/LoginView";
import ScriptsLibraryView from "../views/ScriptsLibraryView/ScriptsLibraryView";
import NotFound from "../views/NotFound";
import { FAQ } from "../views/FAQ/FAQ";

const routes = [
  {
    path: "/",
    element: (
      <MainLayout>
        <LoginView />
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
    path: "/app/:scriptId",
    element: (
      <MainLayout>
        <App />
      </MainLayout>
    ),
  },
  {
    path: "/faq",
    element: (
      <MainLayout>
        <FAQ />
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

//////////////

// import React from "react";
// import { createBrowserRouter } from "react-router-dom";
// import MainLayout from "../layouts/MainLayout";
// import App from "../App";
// import LoginView from "../views/LoginView/LoginView";
// import ScriptsLibraryView from "../views/ScriptsLibraryView/ScriptsLibraryView";
// import NotFound from "../views/NotFound";

// const routes = [
//   {
//     path: "/",
//     element: (
//       <MainLayout>
//         <LoginView />
//       </MainLayout>
//     ),
//   },
//   {
//     path: "/scriptslibrary",
//     element: (
//       <MainLayout>
//         <ScriptsLibraryView />
//       </MainLayout>
//     ),
//   },
//   {
//     path: "/app/:scriptId",
//     element: (
//       <MainLayout>
//         <App />
//       </MainLayout>
//     ),
//   },
//   {
//     path: "*",
//     element: (
//       <MainLayout>
//         <NotFound />
//       </MainLayout>
//     ),
//   },
// ];

// export const router = createBrowserRouter(routes);
