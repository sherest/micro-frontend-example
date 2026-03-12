# livedemos — Host application

Microfrontend **host** for the LiveDemos portal. Runs on **port 3000**.

## Role

- Provides the shell: header (“LiveDemos”), main nav (Demos, Route basics, Route advanced), and main content area.
- Uses **React Router** (`BrowserRouter`, `Routes`, `Route`, `Link`, `NavLink`, `useLocation`).
- **Lazy-loads** remotes via Module Federation; shows a fallback if a remote is down.

## Routes

| Path                | Content                                                                 |
|---------------------|-------------------------------------------------------------------------|
| `/`                 | **Demos** page: catalog + viewer on one page (shared `selectedDemoId`)  |
| `/route-basics/*`   | **Route basics** remote (wrapped with `currentPath` from host)         |
| `/route-advanced/*` | **Route advanced** remote (wrapped with `currentPath` from host)        |

## Integration with remotes

- **Demo catalog & viewer**  
  Rendered on `/` inside `DemosPage`. Host holds `selectedDemoId`; `DemoGrid` gets `onSelectDemo` and `selectedId`, `DemoViewer` gets `demoId`.

- **Route basics & route advanced**  
  The host does **not** render these remotes directly. It renders wrapper components that read `useLocation().pathname` and pass it as **`currentPath`** so the remote can render the correct sub-route (e.g. `/route-basics/contact`) without relying on the remote’s own `<Routes>` seeing the host’s router context.

  - `RouteBasicsPageWithPath` → `<RouteBasicsPage basePath="route-basics" currentPath={pathname} />`
  - `RouteAdvancedPageWithPath` → `<RouteAdvancedPage basePath="route-advanced" currentPath={pathname} />`

## Key files

- **`src/App.jsx`** — Router, nav, route config, lazy remotes, `DemosPage`, and the two path wrappers.
- **`src/style.css`** — Shell and nav styles (e.g. `livedemos-shell`, `livedemos-nav`, `livedemos-remote-wrapper`).
- **`webpack.config.js`** — Module Federation: `remotes` for DemoCatalog, DemoViewer, RouteBasics, RouteAdvanced; `shared` for react, react-dom, react-router-dom.

## Scripts

- `npm start` — Dev server at http://localhost:3000
- `npm run build` — Production build to `dist/`

## Dependencies

- `react`, `react-dom`, `react-router-dom` (shared with remotes in MF config).
