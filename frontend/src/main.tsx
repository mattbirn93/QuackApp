import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { router } from "./routes/Router";
// import { Auth0Provider } from "@auth0/auth0-react";
import "./assets/styles/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </React.StrictMode>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA

// Register the service worker
serviceWorkerRegistration.register();
// serviceWorkerRegistration.unregister();

reportWebVitals();

// Log web vitals
reportWebVitals(console.log);
