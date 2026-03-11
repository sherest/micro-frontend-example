import React from "react";
import "./DemoViewer.css";

const DEMO_INFO = {
  hooks: { title: "React Hooks", code: "const [count, setCount] = useState(0);" },
  "css-grid": { title: "CSS Grid", code: "display: grid;\ngrid-template-columns: repeat(3, 1fr);" },
  "web-apis": { title: "Web APIs", code: "const res = await fetch('/api/data');" },
  forms: { title: "Form patterns", code: "<input value={x} onChange={...} />" },
  animations: { title: "Animations", code: "animation: fade 0.3s ease;" },
};

export default function DemoViewer({ demoId }) {
  const info = demoId ? DEMO_INFO[demoId] : null;

  return (
    <div className="demo-viewer">
      {!info ? (
        <div className="demo-viewer__empty">
          <span className="demo-viewer__empty-icon">▶</span>
          <p>Select a demo from the catalog above to run it here.</p>
        </div>
      ) : (
        <div className="demo-viewer__content">
          <div className="demo-viewer__header">
            <span className="demo-viewer__badge">Live</span>
            <h3 className="demo-viewer__title">{info.title}</h3>
          </div>
          <div className="demo-viewer__preview">
            <pre className="demo-viewer__code">{info.code}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
