import React, { lazy, Suspense, useState } from "react";
import { BrowserRouter, Routes, Route, Link, NavLink, useLocation } from "react-router-dom";
import "./style.css";

const DemoGrid = lazy(() =>
  import("DemoCatalogRemote/DemoGrid").catch(() => ({
    default: () => (
      <div className="livedemos-remote-wrapper">Demo Catalog (start remote on :3001)</div>
    ),
  }))
);
const DemoViewer = lazy(() =>
  import("DemoViewerRemote/DemoViewer").catch(() => ({
    default: () => (
      <div className="livedemos-remote-wrapper">Demo Viewer (start remote on :3002)</div>
    ),
  }))
);
const RouteBasicsPage = lazy(() =>
  import("RouteBasicsRemote/RouteBasicsPage").catch(() => ({
    default: () => (
      <div className="livedemos-remote-wrapper">Route Basics (start remote on :3003)</div>
    ),
  }))
);
const RouteAdvancedPage = lazy(() =>
  import("RouteAdvancedRemote/RouteAdvancedPage").catch(() => ({
    default: () => (
      <div className="livedemos-remote-wrapper">Route Advanced (start remote on :3004)</div>
    ),
  }))
);

const fallback = (
  <div className="livedemos-remote-wrapper loading">Loading…</div>
);

function RouteBasicsPageWithPath() {
  const { pathname } = useLocation();
  return <RouteBasicsPage basePath="route-basics" currentPath={pathname} />;
}

function RouteAdvancedPageWithPath() {
  const { pathname } = useLocation();
  return <RouteAdvancedPage basePath="route-advanced" currentPath={pathname} />;
}

function DemosPage({ selectedDemoId, setSelectedDemoId }) {
  return (
    <>
      <section className="livedemos-section" id="catalog">
        <h2 className="livedemos-section-title">Demo catalog</h2>
        <Suspense fallback={fallback}>
          <DemoGrid
            onSelectDemo={setSelectedDemoId}
            selectedId={selectedDemoId}
          />
        </Suspense>
      </section>

      <section className="livedemos-section" id="viewer">
        <h2 className="livedemos-section-title">Live viewer</h2>
        <Suspense fallback={fallback}>
          <DemoViewer demoId={selectedDemoId} />
        </Suspense>
      </section>
    </>
  );
}

export default function App() {
  const [selectedDemoId, setSelectedDemoId] = useState(null);

  return (
    <BrowserRouter>
      <div className="livedemos-shell">
        <header className="livedemos-header">
          <Link to="/" className="livedemos-logo">
            LiveDemos
          </Link>
          <nav className="livedemos-nav">
            <NavLink to="/">Demos</NavLink>
            <NavLink to="/route-basics">Route basics</NavLink>
            <NavLink to="/route-advanced">Route advanced</NavLink>
          </nav>
        </header>

        <main className="livedemos-main">
          <Routes>
            <Route
              path="/"
              element={
                <DemosPage
                  selectedDemoId={selectedDemoId}
                  setSelectedDemoId={setSelectedDemoId}
                />
              }
            />
            <Route
              path="/route-basics/*"
              element={
                <Suspense fallback={fallback}>
                  <RouteBasicsPageWithPath />
                </Suspense>
              }
            />
            <Route
              path="/route-advanced/*"
              element={
                <Suspense fallback={fallback}>
                  <RouteAdvancedPageWithPath />
                </Suspense>
              }
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
