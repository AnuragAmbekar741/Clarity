# Clarity - Backend Services

Express + TypeScript backend service.

## Tech Stack

- **Runtime:** Node.js
- **Language:** TypeScript (ES2020 target, ES Modules via `nodenext`)
- **Framework:** Express 5
- **Dev Runtime:** tsx (esbuild-based, runs .ts directly without compiling)

## Project Structure

```
services/
├── src/
│   ├── index.ts              # App entry - middleware setup, router mount, server start
│   ├── config/
│   │   └── env.ts            # Centralized env config (dotenv loads here)
│   ├── routes/
│   │   ├── index.ts          # Central router - mounts all route groups
│   │   ├── health.routes.ts  # GET /api/health
│   │   └── user.routes.ts    # GET /api/user/anurag
│   ├── controllers/          # HTTP request/response handlers (to be built)
│   ├── services/             # Business logic layer (to be built)
│   ├── middleware/
│   │   └── error-handler.ts  # Global error handler (4-param Express middleware)
│   ├── utils/
│   │   └── errors.ts         # Custom error classes (AppError, NotFoundError, etc.)
│   └── types/                # TypeScript interfaces (to be built)
├── .env                      # Environment variables (not committed)
├── .gitignore
├── package.json
└── tsconfig.json
```

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Runs server with tsx watch (auto-restart on file changes) |
| `npm run build` | Compiles TypeScript to JavaScript in `dist/` |
| `npm start` | Runs compiled JS in production |

## Middleware Stack (applied in order)

1. **helmet** - Sets security HTTP headers (XSS protection, clickjacking prevention, etc.)
2. **cors** - Restricts API access to `CLIENT_URL` origin, allows credentials
3. **express.json** - Parses JSON request bodies
4. **errorHandler** - Catches all thrown errors, returns consistent JSON responses

## Error Handling

Custom error classes in `utils/errors.ts`:

- `AppError` (base) - carries `statusCode` + `message`
- `NotFoundError` - 404
- `ValidationError` - 400
- `UnauthorizedError` - 401

Throw from anywhere → global error handler catches it → sends JSON response.
Unknown errors return real message in development, generic message in production.

## Environment Variables

| Variable | Default | Purpose |
|---|---|---|
| `PORT` | 8000 | Server port |
| `NODE_ENV` | development | Environment (development/production) |
| `CLIENT_URL` | http://localhost:5173 | Allowed CORS origin |

## Key Decisions

- **ES Modules** (`"type": "module"`) - using `import/export` instead of `require()`
- **tsx over nodemon+ts-node** - single dependency, esbuild-powered, faster
- **Centralized config** (`config/env.ts`) - single source of truth for all env vars
- **Layered architecture** - routes → controllers → services (separation of concerns)
- **All routes under `/api` prefix** - clean separation from potential static files
