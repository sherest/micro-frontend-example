import React from "react";
import DemoCard from "./DemoCard.jsx";
import "./DemoGrid.css";

const DEMOS = [
  { id: "hooks", title: "React Hooks", description: "useState, useEffect and custom hooks in action.", category: "React" },
  { id: "css-grid", title: "CSS Grid", description: "Layouts and responsive grids with CSS Grid.", category: "CSS" },
  { id: "web-apis", title: "Web APIs", description: "Fetch, Storage, and other browser APIs.", category: "APIs" },
  { id: "forms", title: "Form patterns", description: "Controlled inputs and validation.", category: "Forms" },
  { id: "animations", title: "Animations", description: "CSS and JS animation demos.", category: "UI" },
];

export default function DemoGrid({ onSelectDemo, selectedId }) {
  return (
    <div className="demo-grid">
      {DEMOS.map((demo) => (
        <DemoCard
          key={demo.id}
          id={demo.id}
          title={demo.title}
          description={demo.description}
          category={demo.category}
          isSelected={selectedId === demo.id}
          onClick={onSelectDemo}
        />
      ))}
    </div>
  );
}
