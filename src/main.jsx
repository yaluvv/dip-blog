import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./pages/main/Main";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/auth/login",
    element: <div>Hello login!</div>,
  },
  {
    path: "/auth/signup",
    element: <div>Hello signup!</div>,
  },
  {
    path: "*",
    element: <div>Hello 404!</div>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
