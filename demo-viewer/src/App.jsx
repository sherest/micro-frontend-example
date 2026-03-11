import React from "react";
import DemoViewer from "./DemoViewer.jsx";
import "./App.css";

export default function App() {
  return (
    <div className="demo-viewer-standalone">
      <h1>Demo Viewer</h1>
      <DemoViewer demoId={null} />
    </div>
  );
}
