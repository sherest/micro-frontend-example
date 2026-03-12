import React from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import "./styles.css";

const BASE = "route-basics";

function Home() {
  return (
    <div className="rb-block">
      <h3>Home</h3>
      <p>This is the index route for <code>/route-basics</code>.</p>
      <p>Use the links below to see basic routing in action.</p>
    </div>
  );
}

function About() {
  return (
    <div className="rb-block">
      <h3>About</h3>
      <p>You're on <code>/route-basics/about</code> — a simple second route.</p>
    </div>
  );
}

function Contact({ basePath }) {
  const navigate = useNavigate();
  const goHome = () => navigate(basePath ? `/${basePath}` : "/");
  return (
    <div className="rb-block">
      <h3>Contact</h3>
      <p>This route shows <code>useNavigate()</code>: programmatic navigation.</p>
      <button type="button" className="rb-btn" onClick={goHome}>
        Go back to Home
      </button>
    </div>
  );
}

export default function RouteBasicsPage({ basePath = BASE, currentPath }) {
  const homeTo = basePath ? `/${basePath}` : "/";
  const aboutTo = basePath ? `/${basePath}/about` : "/about";
  const contactTo = basePath ? `/${basePath}/contact` : "/contact";

  // When host passes currentPath, render by path so content always shows (avoids
  // remote Routes not seeing host router context in Module Federation).
  const renderContent = () => {
    if (currentPath !== undefined && currentPath !== null) {
      const base = basePath ? `/${basePath}` : "";
      if (currentPath === base || currentPath === `${base}/`) return <Home />;
      if (currentPath === `${base}/about`) return <About />;
      if (currentPath === `${base}/contact`) return <Contact basePath={basePath} />;
      return <Home />;
    }
    return null;
  };

  const usePathProp = currentPath !== undefined && currentPath !== null;

  return (
    <div className="rb-page">
      <h2 className="rb-title">Route basics</h2>
      <p className="rb-desc">Examples: <code>Link</code>, <code>Route</code>, <code>useNavigate</code>.</p>

      <nav className="rb-nav">
        <Link to={homeTo}>Home</Link>
        <Link to={aboutTo}>About</Link>
        <Link to={contactTo}>Contact</Link>
      </nav>

      {usePathProp ? (
        renderContent()
      ) : (
        <Routes>
          <Route path={basePath ? `/${basePath}` : "/"} element={<Home />} />
          <Route path={basePath ? `/${basePath}/about` : "/about"} element={<About />} />
          <Route path={basePath ? `/${basePath}/contact` : "/contact"} element={<Contact basePath={basePath} />} />
        </Routes>
      )}
    </div>
  );
}
