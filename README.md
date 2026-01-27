# PVETUI Website

A React + TypeScript + Vite web application with shadcn/ui components.

## Development

### Prerequisites
- Node.js 20+
- npm

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run linter
npm run lint
```

## Docker Deployment

### Option 1: Production (Recommended)

Rebuild required on code changes. This is the standard, production-safe approach.

```bash
# Build and start
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

### Option 2: Development with Hot Reload

No rebuilds needed. Changes reflect instantly via volume mounting.

```bash
# Start dev container with hot reload
docker-compose -f docker-compose.dev.yml up -d

# Make changes to source code - they auto-reload
```

### Option 3: Build Externally + Mount Dist

Build locally, mount pre-built `dist/` folder. Faster than full rebuilds.

```bash
# Build locally
npm run build

# Start with mounted dist
docker-compose -f docker-compose.mounted.yml up -d

# To update: rebuild locally and restart container
npm run build
docker-compose -f docker-compose.mounted.yml restart
```

### Reverse Proxy Configuration

The application runs on port 3000 inside the container. Example nginx configuration:

```nginx
location / {
    proxy_pass http://localhost:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

### ARM64 Support

The Dockerfile uses multi-platform compatible base images (node:20-alpine) and will work on ARM64 servers natively.

### Viewing Logs with Dozzle

Logs are written to stdout/stderr, making them visible in Dozzle and other log aggregation tools.

## Project Structure

- `src/` - Application source code
- `dist/` - Built static assets (generated)
- `public/` - Public static files
- `components.json` - shadcn/ui configuration
