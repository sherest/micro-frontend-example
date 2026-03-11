import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import RouteAdvancedPage from "./RouteAdvancedPage.jsx";
import "./styles.css";

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <RouteAdvancedPage basePath="" />
    </BrowserRouter>
  </React.StrictMode>
);
