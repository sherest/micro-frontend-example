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
      <p>You’re on <code>/route-basics/about</code> — a simple second route.</p>
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

export default function RouteBasicsPage({ basePath = BASE }) {
  const homeTo = basePath ? `/${basePath}` : "/";
  const aboutTo = basePath ? `/${basePath}/about` : "/about";
  const contactTo = basePath ? `/${basePath}/contact` : "/contact";
  const homePath = basePath || "/";
  const aboutPath = basePath ? `${basePath}/about` : "about";
  const contactPath = basePath ? `${basePath}/contact` : "contact";

  return (
    <div className="rb-page">
      <h2 className="rb-title">Route basics</h2>
      <p className="rb-desc">Examples: <code>Link</code>, <code>Route</code>, <code>useNavigate</code>.</p>

      <nav className="rb-nav">
        <Link to={homeTo} end>Home</Link>
        <Link to={aboutTo}>About</Link>
        <Link to={contactTo}>Contact</Link>
      </nav>

      <Routes>
        <Route path={homePath} element={<Home />} />
        <Route path={aboutPath} element={<About />} />
        <Route path={contactPath} element={<Contact basePath={basePath} />} />
      </Routes>
    </div>
  );
}
