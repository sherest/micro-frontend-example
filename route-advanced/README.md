# route-advanced — Remote application

**Remote** microfrontend that demonstrates advanced React Router usage. Runs on **port 3004**.

## Role

- Shows **Route advanced** with: Home, User (dynamic segment), Search (query params), and Nested (parent/child with Outlet).
- Demonstrates `useParams`, `useSearchParams`, and nested routes with `Outlet`.
- Works both **standalone** (own router) and **inside the host** (host passes pathname; remote renders by path and, for User, parses `userId` from the path).

## Exposed modules (Module Federation)

| Expose                  | Path                                | Description                    |
|-------------------------|-------------------------------------|--------------------------------|
| `./RouteAdvancedPage`   | `./src/RouteAdvancedPage.jsx`       | Full page component            |

## Props (when consumed by host)

**RouteAdvancedPage**

- `basePath?: string` — Default `"route-advanced"`. Used for link `to` and for path matching.
- `currentPath?: string` — When provided by the host (e.g. `pathname` from `useLocation()`), the remote **does not use `<Routes>`**; it picks the correct screen by path and, for `/route-advanced/user/:id`, parses `userId` and passes it to `UserDetail`. This avoids router-context issues under Module Federation.

## Path-based rendering (when `currentPath` is set)

- `"/route-advanced"` or `"/route-advanced/"` → **AdvancedIndex** (home)
- `"/route-advanced/user/:userId"` → **UserDetail** with `userId` parsed from path (prop fallback when not from `<Route>`)
- `"/route-advanced/search"` → **SearchPage** (still uses `useSearchParams()` from host’s router)
- `"/route-advanced/nested"` → **NestedLayout** with short message
- `"/route-advanced/nested/child"` → **NestedLayout** wrapping **NestedChild**

When `currentPath` is not set (standalone), the app uses normal `<Routes>` with index, `user/:userId`, `search`, and nested `nested` / `nested/child`.

## Key files

- **`src/RouteAdvancedPage.jsx`** — Exported page: nav (Links), path-based content or `<Routes>`. Includes `parseUserIdFromPath()` for host mode; `UserDetail` accepts optional `userId` prop; `NestedLayout` accepts optional `children` for path-based nested child.
- **`src/styles.css`** — `.ra-page`, `.ra-nav`, `.ra-block`, `.ra-input`, etc.
- **`src/bootstrap.js`** — Standalone: wraps in `BrowserRouter` and renders `RouteAdvancedPage` with `basePath=""`.
- **`webpack.config.js`** — Module Federation: `name: "RouteAdvanced"`, exposes `RouteAdvancedPage`, `shared`: react, react-dom, react-router-dom.

## Scripts

- `npm start` — Dev server at http://localhost:3004
- `npm run build` — Production build to `dist/`

## Standalone vs host

- **Standalone**: URLs like `/`, `/user/42`, `/search`, `/nested`, `/nested/child`; uses internal `<Routes>` and `useParams` / `useSearchParams`.
- **In host**: Host passes `currentPath={pathname}`; URLs are under `/route-advanced/...`; content and User id are derived from path so all views work correctly inside the host.
