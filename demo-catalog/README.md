# demo-catalog — Remote application

**Remote** microfrontend that provides the demo catalog grid. Runs on **port 3001**.

## Role

- Renders a grid of demo cards (React Hooks, CSS Grid, Web APIs, Forms, Animations).
- Used by the host on the **Demos** page (`/`). When a card is clicked, the host’s `selectedDemoId` updates and the **demo-viewer** remote shows the corresponding demo.

## Exposed modules (Module Federation)

| Expose            | Path                              | Description        |
|-------------------|-----------------------------------|--------------------|
| `./DemoGrid`      | `./src/components/DemoGrid.jsx`   | Grid of demo cards |
| `./DemoCard`      | `./src/components/DemoCard.jsx`   | Single demo card   |

The host consumes **`DemoGrid`** only; `DemoCard` is used internally by `DemoGrid`.

## Props (when consumed by host)

**DemoGrid**

- `onSelectDemo: (id: string) => void` — Called when a card is clicked; host typically sets `selectedDemoId`.
- `selectedId: string | null` — Id of the currently selected demo (for highlight).

## Key files

- **`src/components/DemoGrid.jsx`** — Defines `DEMOS` array and maps to `DemoCard`; receives `onSelectDemo` and `selectedId`.
- **`src/components/DemoCard.jsx`** — Single card UI; `onClick` calls `onSelectDemo(id)`.
- **`src/App.jsx`** — Standalone entry: renders `DemoGrid` with no-op `onSelectDemo` for dev at port 3001.
- **`webpack.config.js`** — Module Federation: `name: "DemoCatalog"`, `exposes` as above, `shared`: react, react-dom.

## Scripts

- `npm start` — Dev server at http://localhost:3001
- `npm run build` — Production build to `dist/`

## Standalone vs host

- **Standalone** (http://localhost:3001): Full page with “Demo Catalog” and the grid; selection has no effect.
- **In host**: Only the grid (and optional title from host) is shown; selection updates the host state and the demo-viewer remote.
