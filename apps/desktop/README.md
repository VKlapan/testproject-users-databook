# Desktop App Setup

To run the desktop application:

## Prerequisites
- Node.js v22+
- pnpm (monorepo package manager)
- API server running on `http://localhost:3000`
- Auth token set in `.env` (`VITE_API_TOKEN`) for protected endpoints

## Development

```bash
cd apps/desktop
pnpm install
pnpm run dev
```

This will:
- Start Vite dev server for React on port 5173
- Launch Electron with hot reload

## Auth Token

The API uses JWT auth for protected endpoints (e.g. `GET /api/v1/get-users`).
Token is provided via `.env` in the renderer root:

```
apps/desktop/src/renderer/.env
```

```
VITE_API_TOKEN="<your_jwt_token>"
```

## Building

```bash
pnpm run build
```

Creates production-ready bundle in `dist/` directory.
