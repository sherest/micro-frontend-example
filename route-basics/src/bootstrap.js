import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import RouteBasicsPage from "./RouteBasicsPage.jsx";
import "./styles.css";

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <RouteBasicsPage basePath="" />
    </BrowserRouter>
  </React.StrictMode>
);
