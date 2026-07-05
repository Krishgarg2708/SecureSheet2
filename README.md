# SecureSheet — Enterprise Spreadsheet Management Platform

A frontend-only, Excel-inspired enterprise spreadsheet platform with cell-level
permissions, undo/redo, activity history, and CSV/Excel export — built with
React 19, TypeScript, Vite, Tailwind CSS, AG Grid, Zustand, and Framer Motion.
No backend, no APIs, no database. All state lives in React + `localStorage`.

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL in your browser.

## Build for production

```bash
npm run build
npm run preview
```

## Deploying to Vercel

This project is ready to deploy as-is:

1. Push this folder to a Git repository.
2. Import the repository in Vercel.
3. Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`.
4. Deploy — `vercel.json` already handles client-side routing rewrites.

## Demo accounts

| Role     | Email                     | Password      |
|----------|---------------------------|---------------|
| Admin    | admin@securesheet.io      | admin123      |
| Manager  | manager@securesheet.io    | manager123    |
| Employee | employee@securesheet.io   | employee123   |

Each role sees different cell permissions in the Spreadsheet Workspace —
Admin can edit admin-only and manager-only cells, Manager can edit
manager-only cells, and Employee is restricted to plain editable cells.

## Feature map

- **Landing page** — hero, features, how it works, pricing, testimonials, FAQ.
- **Login** — mock role-based auth, Remember Me, Forgot Password UI.
- **Dashboard** — stats, recent files, pinned sheets, recent activity.
- **Spreadsheet Workspace** — AG Grid with 120 rows x 22 columns, sorting,
  filtering, pagination, resizable/movable columns, cell-level permissions,
  inline editors (text, number, select, checkbox, date, textarea), undo/redo,
  autosave to `localStorage`, and CSV / Excel / mock-PDF export.
- **Templates** — gallery of prebuilt workspace templates.
- **Notifications** — filterable notification center.
- **Activity History** — searchable audit log with old/new values and status.
- **Settings** — dark mode, compact mode, grid density, language, notifications.
- **Profile** — account details and logout.
- **404** — fallback page for unmatched routes.

## Notes on scope

- PDF export produces a readable text-based report rather than a true binary
  PDF, since generating real PDFs client-side without a rendering engine or
  backend is outside this frontend-only app's scope. CSV and Excel exports
  are fully functional and open correctly in Excel/Sheets.
- All data (users, files, activity log, notifications, templates, and the
  spreadsheet's 120 rows) is mock data generated in `src/data/`.
