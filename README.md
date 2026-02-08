# PVETUI Website

Static React + TypeScript + Vite site for PVETUI.

## Prerequisites

- Node.js 20+
- npm
- Docker (optional)

## Local Development

```bash
npm install
npm run dev
```

Default Vite URL: `http://localhost:5173`

## Scripts

```bash
npm run dev         # Start dev server
npm run lint        # ESLint
npm run test        # Vitest (run once)
npm run test:watch  # Vitest watch mode
npm run build       # Type-check + production build
npm run preview     # Preview production build
```

## Docker

### Production compose

`docker-compose.yml` builds and serves the static site on container port `3000`.

```bash
docker-compose up -d --build
docker-compose logs -f
docker-compose down
```

Host port is configurable via `PVETUI_WEB_HOST_PORT`:

```bash
PVETUI_WEB_HOST_PORT=3001 docker-compose up -d --build
```

### Dev compose (hot reload)

`docker-compose.dev.yml` runs Vite with source mounts on `5173:5173`.

```bash
docker-compose -f docker-compose.dev.yml up -d
```

### Mounted dist compose

`docker-compose.mounted.yml` serves a locally built `dist/`.

```bash
npm run build
docker-compose -f docker-compose.mounted.yml up -d
```

## CI

GitHub Actions workflow at `.github/workflows/ci.yml` runs:

- `npm ci`
- `npm run lint`
- `npm run test`
- `npm run build`

## SEO files

Static SEO assets live in `public/`:

- `public/robots.txt`
- `public/sitemap.xml`
