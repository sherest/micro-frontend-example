# route-basics — Remote application

**Remote** microfrontend that demonstrates basic React Router usage. Runs on **port 3003**.

## Role

- Shows **Route basics** with three internal “routes”: Home, About, Contact.
- Demonstrates `Link`, `Route`, and `useNavigate` (e.g. “Go back to Home” on Contact).
- Works both **standalone** (own router) and **inside the host** (host passes pathname so content always renders).

## Exposed modules (Module Federation)

| Expose               | Path                            | Description                    |
|----------------------|---------------------------------|--------------------------------|
| `./RouteBasicsPage`  | `./src/RouteBasicsPage.jsx`     | Full page component            |

## Props (when consumed by host)

**RouteBasicsPage**

- `basePath?: string` — Default `"route-basics"`. Used for link `to` and, when not using `currentPath`, for route paths.
- `currentPath?: string` — When provided by the host (e.g. `pathname` from `useLocation()`), the remote **does not use `<Routes>`**; it picks Home / About / Contact by matching `currentPath`. This avoids the remote’s Routes not seeing the host’s router context under Module Federation.

## Path-based rendering (when `currentPath` is set)

- `"/route-basics"` or `"/route-basics/"` → **Home**
- `"/route-basics/about"` → **About**
- `"/route-basics/contact"` → **Contact** (with “Go back to Home” using `useNavigate`)

When `currentPath` is not set (standalone), the app uses normal `<Routes>` with paths `"/"`, `"/about"`, `"/contact"`.

## Key files

- **`src/RouteBasicsPage.jsx`** — Exported page: nav (Links), and either path-based content or `<Routes>` with Home, About, Contact. Contact uses `useNavigate()` and optional `basePath` for “Go back”.
- **`src/styles.css`** — `.rb-page`, `.rb-nav`, `.rb-block`, etc.
- **`src/bootstrap.js`** — Standalone: wraps in `BrowserRouter` and renders `RouteBasicsPage` with `basePath=""`.
- **`webpack.config.js`** — Module Federation: `name: "RouteBasics"`, exposes `RouteBasicsPage`, `shared`: react, react-dom, react-router-dom.

## Scripts

- `npm start` — Dev server at http://localhost:3003
- `npm run build` — Production build to `dist/`

## Standalone vs host

- **Standalone**: URL is `/`, `/about`, `/contact`; uses internal `<Routes>`.
- **In host**: Host passes `currentPath={pathname}`; URL is `/route-basics`, `/route-basics/about`, `/route-basics/contact`; content is chosen by path, so all three views render correctly inside the host.
