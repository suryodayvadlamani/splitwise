### Splitwise-like Monorepo (Bun)

This is a Bun-based monorepo for a Splitwise-like app with an API (Hono + Drizzle + Postgres) and a Web client (Vite + React + TypeScript), plus shared packages for types and DB schema.

### Quickstart

1) Install Bun [[memory:7027186]]
```bash
curl -fsSL https://bun.sh/install | bash
```

2) Install dependencies
```bash
bun install
```

3) Start dev servers (API, Web, Mobile)
```bash
bun run dev
```

- API: `http://localhost:3001/health`
- Web: `http://localhost:5173/`
- Mobile: Expo dev menu after QR scan

### Workspaces

- `apps/api`: Hono server, Drizzle ORM, Postgres
- `apps/web`: Vite + React
- `apps/mobile`: Expo + React Native
- `packages/types`: shared TypeScript types
- `packages/db`: shared Drizzle schema and DB utilities
