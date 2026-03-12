# demo-viewer — Remote application

**Remote** microfrontend that shows the currently selected demo. Runs on **port 3002**.

## Role

- Renders either a placeholder (“Select a demo from the catalog…”) or a **Live** block with the selected demo’s title and a code snippet.
- Used by the host on the **Demos** page (`/`); it receives `demoId` from the host’s `selectedDemoId` (set by the demo-catalog remote).

## Exposed modules (Module Federation)

| Expose         | Path                        | Description              |
|----------------|-----------------------------|--------------------------|
| `./DemoViewer` | `./src/DemoViewer.jsx`      | Viewer component         |

## Props (when consumed by host)

**DemoViewer**

- `demoId: string | null` — Id of the selected demo (`hooks`, `css-grid`, `web-apis`, `forms`, `animations`). When `null`, the empty state is shown.

## Key files

- **`src/DemoViewer.jsx`** — `DEMO_INFO` map (title + code snippet per id); renders empty state or content block with badge and `<pre>`.
- **`src/DemoViewer.css`** — Styles for empty state, header, and code block.
- **`src/App.jsx`** — Standalone entry: renders `DemoViewer` with `demoId={null}` for dev at port 3002.
- **`webpack.config.js`** — Module Federation: `name: "DemoViewer"`, `exposes` as above, `shared`: react, react-dom.

## Scripts

- `npm start` — Dev server at http://localhost:3002
- `npm run build` — Production build to `dist/`

## Standalone vs host

- **Standalone** (http://localhost:3002): Shows “Select a demo…” only.
- **In host**: Receives `demoId` from host state; shows the matching demo or empty state.
