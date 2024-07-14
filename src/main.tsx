import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import NotFound from "./components/NotFound/NotFound.tsx";
import Details from "./components/Details/Details.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/:id",
        element: <Details />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router}></RouterProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
