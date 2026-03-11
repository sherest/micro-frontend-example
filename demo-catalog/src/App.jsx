import React from "react";
import DemoGrid from "./components/DemoGrid.jsx";
import "./App.css";

export default function App() {
  return (
    <div className="demo-catalog-standalone">
      <h1>Demo Catalog</h1>
      <p>This app runs standalone on port 3001. In the host it appears as a remote.</p>
      <DemoGrid onSelectDemo={() => {}} selectedId={null} />
    </div>
  );
}
