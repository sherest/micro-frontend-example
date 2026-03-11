# LiveDemos Portal — Microfrontends

A **microfrontend** setup inspired by the [Microfrontends crash course](https://www.youtube.com/watch?v=qkaTFb7mOb4) and [GitHub repo](https://github.com/vbothe91/Microfrontends-crash-course/tree/master/1.%20MFEs-with-react). One host and **four** remotes, with **React Router** for page-level navigation and two remotes dedicated to **route examples**.

## Structure

| App               | Role   | Port | Description                                              |
|-------------------|--------|------|----------------------------------------------------------|
| **livedemos**     | Host   | 3000 | Shell: header, nav, React Router; loads remotes as pages |
| **demo-catalog**  | Remote | 3001 | Demo catalog grid (cards)                                |
| **demo-viewer**   | Remote | 3002 | Live viewer for the selected demo                        |
| **route-basics**  | Remote | 3003 | Route examples: `Link`, `Route`, `useNavigate`            |
| **route-advanced**| Remote | 3004 | Route examples: `useParams`, `useSearchParams`, `Outlet`   |

The host uses **React Router** with routes:

- `/catalog` — Demo catalog (remote)
- `/viewer` — Demo viewer (remote)
- `/route-basics` and `/route-basics/*` — Basic route examples (remote)
- `/route-advanced` and `/route-advanced/*` — Advanced route examples (remote)

## How to run

Start **remotes first**, then the host.

1. **Demo catalog** (optional for catalog/viewer pages)
   ```bash
   cd demo-catalog && npm install && npm start
   ```
   → http://localhost:3001

2. **Demo viewer** (optional)
   ```bash
   cd demo-viewer && npm install && npm start
   ```
   → http://localhost:3002

3. **Route basics** (for route examples)
   ```bash
   cd route-basics && npm install && npm start
   ```
   → http://localhost:3003

4. **Route advanced** (for route examples)
   ```bash
   cd route-advanced && npm install && npm start
   ```
   → http://localhost:3004

5. **Host**
   ```bash
   cd livedemos && npm install && npm start
   ```
   → http://localhost:3000 — open this to use the full portal.

If a remote is not running, the host shows a fallback message for that page.

## Route examples (remotes)

- **Route basics** (port 3003): `Link`, `Route`, `useNavigate` — Home, About, Contact with in-page navigation and a “Go back” button.
- **Route advanced** (port 3004): `useParams` (e.g. `/user/42`), `useSearchParams` (e.g. `/search?q=hello`), and nested routes with `Outlet`.

## Tech

- **React 18**
- **React Router 6**
- **Webpack 5** with **Module Federation**
- Shared **react**, **react-dom**, **react-router-dom** (singleton) across host and remotes

## References

- [YouTube: Microfrontends crash course](https://www.youtube.com/watch?v=qkaTFb7mOb4)
- [GitHub: vbothe91/Microfrontends-crash-course — 1. MFEs-with-react](https://github.com/vbothe91/Microfrontends-crash-course/tree/master/1.%20MFEs-with-react)
