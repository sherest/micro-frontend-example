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

function UserDetail({ userId: userIdProp }) {
  const params = useParams();
  const userId = userIdProp ?? params.userId;
  return (
    <div className="ra-block">
      <h3>useParams</h3>
      <p>Current <code>userId</code> from the URL: <strong>{userId ?? "—"}</strong></p>
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

function NestedLayout({ children }) {
  return (
    <div className="ra-block">
      <h3>Nested routes</h3>
      <p>Parent layout with <code>Outlet</code> below for child routes:</p>
      {children ?? <Outlet />}
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

function parseUserIdFromPath(pathname, base) {
  if (!pathname || !base) return null;
  const prefix = base.startsWith("/") ? base : `/${base}`;
  const pattern = `${prefix}/user/`;
  if (!pathname.startsWith(pattern)) return null;
  const rest = pathname.slice(pattern.length);
  const segment = rest.split("/")[0];
  return segment || null;
}

export default function RouteAdvancedPage({ basePath = BASE, currentPath }) {
  const homeTo = basePath ? `/${basePath}` : "/";
  const userTo = (id) => (basePath ? `/${basePath}/user/${id}` : `/user/${id}`);
  const searchTo = basePath ? `/${basePath}/search` : "/search";
  const nestedTo = basePath ? `/${basePath}/nested` : "/nested";
  const nestedChildTo = basePath ? `/${basePath}/nested/child` : "/nested/child";

  const usePathProp = currentPath !== undefined && currentPath !== null;
  const base = basePath ? `/${basePath}` : "";

  const renderContent = () => {
    if (!usePathProp || !currentPath) return null;
    if (currentPath === base || currentPath === `${base}/`) return <AdvancedIndex />;
    const userId = parseUserIdFromPath(currentPath, base);
    if (userId !== null) return <UserDetail userId={userId} />;
    if (currentPath === `${base}/search`) return <SearchPage />;
    if (currentPath === `${base}/nested/child`) return <NestedLayout><NestedChild /></NestedLayout>;
    if (currentPath === `${base}/nested`) return <NestedLayout><p className="ra-hint">Nested parent. Use &quot;Nested child&quot; link for the child route.</p></NestedLayout>;
    return <AdvancedIndex />;
  };

  return (
    <div className="ra-page">
      <h2 className="ra-title">Route advanced</h2>
      <p className="ra-desc">Examples: <code>useParams</code>, <code>useSearchParams</code>, nested <code>Outlet</code>.</p>

      <nav className="ra-nav">
        <Link to={homeTo}>Home</Link>
        <Link to={userTo("42")}>User 42</Link>
        <Link to={searchTo}>Search</Link>
        <Link to={nestedTo}>Nested</Link>
        <Link to={nestedChildTo}>Nested child</Link>
      </nav>

      {usePathProp ? (
        renderContent()
      ) : (
        <Routes>
          <Route path={basePath ? `/${basePath}` : "/"} element={<AdvancedIndex />} />
          <Route path={basePath ? `/${basePath}/user/:userId` : "/user/:userId"} element={<UserDetail />} />
          <Route path={basePath ? `/${basePath}/search` : "/search"} element={<SearchPage />} />
          <Route path={basePath ? `/${basePath}/nested` : "/nested"} element={<NestedLayout />}>
            <Route path="child" element={<NestedChild />} />
          </Route>
        </Routes>
      )}
    </div>
  );
}
