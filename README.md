# LiveDemos Portal — Microfrontends

A **microfrontend** setup inspired by the [Microfrontends crash course](https://www.youtube.com/watch?v=qkaTFb7mOb4) and [GitHub repo](https://github.com/vbothe91/Microfrontends-crash-course/tree/master/1.%20MFEs-with-react). One host and **four** remotes, with **React Router** for page-level navigation and two remotes that demonstrate routing inside the host.

## Structure

| App                | Role   | Port | Description                                              |
|--------------------|--------|------|----------------------------------------------------------|
| **livedemos**      | Host   | 3000 | Shell: header, nav, React Router; loads remotes as pages |
| **demo-catalog**   | Remote | 3001 | Demo catalog grid (cards)                                |
| **demo-viewer**    | Remote | 3002 | Live viewer for the selected demo                        |
| **route-basics**   | Remote | 3003 | Route examples: `Link`, `Route`, `useNavigate`            |
| **route-advanced** | Remote | 3004 | Route examples: `useParams`, `useSearchParams`, `Outlet`  |

### Host routes

- **`/`** — **Demos** page: catalog + viewer on the same page (shared `selectedDemoId` state).
- **`/route-basics`** and **`/route-basics/*`** — Route basics remote (Home, About, Contact).
- **`/route-advanced`** and **`/route-advanced/*`** — Route advanced remote (User, Search, Nested).

### Running inside the host (route-basics & route-advanced)

So that sub-routes (e.g. `/route-basics/contact`, `/route-advanced/user/42`) render correctly under Module Federation, the **host** passes the current pathname into these remotes as a **`currentPath`** prop. The remotes then **render by path** when `currentPath` is set (instead of relying on their own `<Routes>`), which avoids router-context issues when remotes run inside the host. When run **standalone** (their own port), the remotes still use React Router `<Routes>` as usual.

## How to run

Start **remotes first**, then the host.

1. **Demo catalog** (for Demos page)
   ```bash
   cd demo-catalog && npm install && npm start
   ```
   → http://localhost:3001

2. **Demo viewer** (for Demos page)
   ```bash
   cd demo-viewer && npm install && npm start
   ```
   → http://localhost:3002

3. **Route basics** (for Route basics page in host)
   ```bash
   cd route-basics && npm install && npm start
   ```
   → http://localhost:3003

4. **Route advanced** (for Route advanced page in host)
   ```bash
   cd route-advanced && npm install && npm start
   ```
   → http://localhost:3004

5. **Host**
   ```bash
   cd livedemos && npm install && npm start
   ```
   → http://localhost:3000 — open this for the full portal.

If a remote is not running, the host shows a fallback message for that slot.

## App-specific docs

Each app has its own **README.md** with code-level details:

- [livedemos/README.md](livedemos/README.md) — Host app
- [demo-catalog/README.md](demo-catalog/README.md) — Demo catalog remote
- [demo-viewer/README.md](demo-viewer/README.md) — Demo viewer remote
- [route-basics/README.md](route-basics/README.md) — Route basics remote
- [route-advanced/README.md](route-advanced/README.md) — Route advanced remote

## Tech

- **React 18**
- **React Router 6**
- **Webpack 5** with **Module Federation**
- Shared **react**, **react-dom**, **react-router-dom** (singleton) across host and remotes

## References

- [YouTube: Microfrontends crash course](https://www.youtube.com/watch?v=qkaTFb7mOb4)
- [GitHub: vbothe91/Microfrontends-crash-course — 1. MFEs-with-react](https://github.com/vbothe91/Microfrontends-crash-course/tree/master/1.%20MFEs-with-react)
