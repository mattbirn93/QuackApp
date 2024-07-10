import { jsx as _jsx } from "react/jsx-runtime";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import App from "../App";
import ScriptsLibraryView from "../views/ScriptsLibraryView/ScriptsLibraryView";
import { FAQ } from "../views/FAQ/FAQ";
import NotFound from "../views/NotFound";

const routes = [
  {
    path: "/",
    element: _jsx(MainLayout, { children: _jsx(App, {}) }),
  },
  {
    path: "/scriptslibrary",
    element: _jsx(MainLayout, { children: _jsx(ScriptsLibraryView, {}) }),
  },
  {
    path: "/app/:scriptId",
    element: _jsx(MainLayout, { children: _jsx(App, {}) }),
  },
  {
    path: "/faq",
    element: _jsx(MainLayout, { children: _jsx(FAQ, {}) }),
  },
  {
    path: "*",
    element: _jsx(MainLayout, { children: _jsx(NotFound, {}) }),
  },
];
export const router = createBrowserRouter(routes);
