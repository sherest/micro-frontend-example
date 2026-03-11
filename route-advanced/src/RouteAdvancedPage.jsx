import React from "react";
import {
  Routes,
  Route,
  Link,
  useParams,
  useSearchParams,
  Outlet,
} from "react-router-dom";
import "./styles.css";

const BASE = "route-advanced";

function AdvancedIndex() {
  return (
    <div className="ra-block">
      <h3>Advanced routing</h3>
      <p>This page demonstrates <code>useParams</code>, <code>useSearchParams</code>, and nested routes with <code>Outlet</code>.</p>
      <ul className="ra-list">
        <li><strong>User (useParams)</strong> — path like <code>/route-advanced/user/123</code></li>
        <li><strong>Search (useSearchParams)</strong> — path like <code>/route-advanced/search?q=hello</code></li>
        <li><strong>Nested (Outlet)</strong> — parent/child route structure</li>
      </ul>
    </div>
  );
}

function UserDetail() {
  const { userId } = useParams();
  return (
    <div className="ra-block">
      <h3>useParams</h3>
      <p>Current <code>userId</code> from the URL: <strong>{userId}</strong></p>
      <p>Try changing the URL to <code>/route-advanced/user/456</code> (or <code>/user/456</code> when standalone).</p>
    </div>
  );
}

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q") ?? "";
  return (
    <div className="ra-block">
      <h3>useSearchParams</h3>
      <p>Current <code>q</code>: <strong>{q || "(none)"}</strong></p>
      <input
        type="text"
        placeholder="Search"
        value={q}
        onChange={(e) => setSearchParams(e.target.value ? { q: e.target.value } : {})}
        className="ra-input"
      />
      <p className="ra-hint">URL updates as you type (e.g. <code>?q=hello</code>).</p>
    </div>
  );
}

function NestedLayout() {
  return (
    <div className="ra-block">
      <h3>Nested routes</h3>
      <p>Parent layout with <code>Outlet</code> below for child routes:</p>
      <Outlet />
    </div>
  );
}

function NestedChild() {
  return (
    <div className="ra-block ra-nested-child">
      <p>This is the nested child content (e.g. <code>/route-advanced/nested/child</code>).</p>
    </div>
  );
}

export default function RouteAdvancedPage({ basePath = BASE }) {
  const homeTo = basePath ? `/${basePath}` : "/";
  const userTo = (id) => (basePath ? `/${basePath}/user/${id}` : `/user/${id}`);
  const searchTo = basePath ? `/${basePath}/search` : "/search";
  const nestedTo = basePath ? `/${basePath}/nested` : "/nested";
  const nestedChildTo = basePath ? `/${basePath}/nested/child` : "/nested/child";

  const homePath = basePath || "/";
  const userPath = basePath ? `${basePath}/user/:userId` : "user/:userId";
  const searchPath = basePath ? `${basePath}/search` : "search";
  const nestedPath = basePath ? `${basePath}/nested` : "nested";

  return (
    <div className="ra-page">
      <h2 className="ra-title">Route advanced</h2>
      <p className="ra-desc">Examples: <code>useParams</code>, <code>useSearchParams</code>, nested <code>Outlet</code>.</p>

      <nav className="ra-nav">
        <Link to={homeTo} end>Home</Link>
        <Link to={userTo("42")}>User 42</Link>
        <Link to={searchTo}>Search</Link>
        <Link to={nestedTo}>Nested</Link>
        <Link to={nestedChildTo}>Nested child</Link>
      </nav>

      <Routes>
        <Route path={homePath} element={<AdvancedIndex />} />
        <Route path={userPath} element={<UserDetail />} />
        <Route path={searchPath} element={<SearchPage />} />
        <Route path={nestedPath} element={<NestedLayout />}>
          <Route path="child" element={<NestedChild />} />
        </Route>
      </Routes>
    </div>
  );
}
