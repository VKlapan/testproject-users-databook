# apps/api

A lightweight REST API for user management built with NestJS.

## Overview

This service provides basic user read and create operations and validates JWT tokens supplied in the HTTP `Authorization: Bearer <token>` header. Token issuance is handled by an external authentication service — this application only verifies incoming tokens.

Main endpoints
- GET `/get-users` — list users (supports `page`, `limit`, `search` query params).
- GET `/get-user/:id` — get single user by id.
- POST `/add-user` — create a new user (public).

## Environment

Required environment variables (set in `.env`):
- `MONGODB_STRING` — MongoDB connection string.
- `JWT_SECRET` — secret used to validate incoming JWT tokens.

Optional:
- `JWT_EXPIRES_IN` — token expiry when tokens are issued internally (not used by this service).

## Running the service

Install dependencies and run in development:

```bash
pnpm install
pnpm -C apps/api run start:dev
```

Build for production:

```bash
pnpm -C apps/api run build
pnpm -C apps/api run start:prod
```

## Testing & Linting

Run tests:

```bash
pnpm -C apps/api run test
pnpm -C apps/api run test:e2e
```

Run linter:

```bash
pnpm -C apps/api run lint
```

## Usage examples

Protected endpoints require the `Authorization: Bearer <token>` header. Example with `curl`:

```bash
curl -H "Authorization: Bearer $TOKEN" http://localhost:3000/get-users
```

To create a user (public):

```bash
curl -X POST http://localhost:3000/add-user \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"alice@example.com","phone":"+123456789","birthday":"01-01-1990"}'
```

## Notes

- This service intentionally does not store or validate user passwords; tokens must be issued by an external auth provider.

