# FansCRM Monorepo

A simple monorepo with a NestJS backend API and an Electron + React desktop client. The desktop app communicates with the API and supports basic user management with pagination.

## Workspace Structure

- apps/api — NestJS backend (MongoDB, JWT auth)
- apps/desktop — Electron + React + Vite desktop client
- packages/* — shared workspace packages (config/ui/utils)

## Prerequisites

- Node.js v22+
- pnpm
- MongoDB running (see apps/api/.env)

## Install

```bash
pnpm install
```

## Run Backend (API)

```bash
cd apps/api
pnpm run dev
```

Default URL: http://localhost:3000 (with global prefix /api/v1)

## Run Desktop App

```bash
cd apps/desktop
pnpm run dev
```

Vite dev server: http://localhost:5173
Electron loads the renderer from Vite in dev mode.

## Auth Token (Desktop)

The API is protected by JWT. The desktop client reads the token from:

```
apps/desktop/src/renderer/.env
```

Example:

```
VITE_API_TOKEN="<your_jwt_token>"
```

## Key Endpoints

- GET /api/v1/get-users?page=1&limit=10
- POST /api/v1/add-user

## Notes

- The backend validates JWT using `JWT_SECRET` from apps/api/.env.
- The desktop app uses pagination on the users list.
