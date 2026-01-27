# AGENTS.md - Context for AI Agents

## Project Overview
This is a React + TypeScript + Vite website for PVETUI (Terminal UI for Proxmox VE). It uses shadcn/ui components and is designed to be deployed as a static site.

## Tech Stack
- **Framework**: React 19 + TypeScript + Vite
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Styling**: Tailwind CSS
- **Routing**: react-router-dom v7
- **State Management**: React hooks, react-hook-form with Zod validation

## Development Commands
```bash
npm install        # Install dependencies
npm run dev        # Start dev server (port 5173)
npm run build      # Build production bundle (outputs to dist/)
npm run preview    # Preview production build locally
npm run lint       # Run ESLint
```

## Docker Deployment
The project uses multi-stage Docker builds optimized for ARM64.

### Production Deployment (Main)
- **File**: `docker-compose.yml`
- **Port**: 3000 (mapped from host)
- **Approach**: Full rebuild required on code changes (recommended for production)
- **Command**: `docker-compose up -d --build`

### Development with Hot Reload
- **File**: `docker-compose.dev.yml`
- **Port**: 5173
- **Approach**: Volume mounts for instant code reloads
- **Command**: `docker-compose -f docker-compose.dev.yml up -d`

### Mounted Dist (Fast Iteration)
- **File**: `docker-compose.mounted.yml`
- **Port**: 3000
- **Approach**: Build locally, mount dist folder to container
- **Command**: 
  ```bash
  npm run build
  docker-compose -f docker-compose.mounted.yml up -d
  ```

## Production Environment
- **Server**: instance0 (ARM64)
- **Deployment Location**: `/opt/stacks/pvetui_web/`
- **Container Manager**: Dockge
- **Reverse Proxy**: Zoraxy (on zoraxy_public network)
- **Container Name**: pvetui_web-web-1
- **Internal Port**: 3000
- **Host Port**: 3001 (mapped via compose.yaml)
- **Network**: zoraxy_public (external)

## Dockerfile Architecture
- **Builder stage**: node:20-alpine - builds the app with `npm run build`
- **Production stage**: node:20-alpine - uses `serve` to host static files from dist/
- **Logs**: Written to stdout/stderr for Dozzle compatibility

## Key Configuration Files
- `vite.config.ts` - Vite configuration with base path set to './' for relative paths
- `tailwind.config.js` - Tailwind CSS configuration
- `components.json` - shadcn/ui component configuration
- `package.json` - Dependencies and scripts

## Project Structure
```
src/
├── components/       # React components
├── pages/           # Page components
├── lib/             # Utility functions
└── App.tsx          # Main app component
dist/                # Built assets (generated)
public/              # Static assets
```

## Testing the Application
After changes, always:
1. Run `npm run lint` to check for linting errors
2. Test build with `npm run build`
3. Optionally test with `docker build -t pvetui-website:test .`

## Common Tasks
- Adding shadcn/ui components: Use `npx shadcn@latest add [component-name]`
- Installing dependencies: `npm install [package-name]`
- Checking types: TypeScript is configured - use your IDE or `tsc --noEmit`

## Deployment Workflow
1. Commit changes to git
2. SSH to instance0: `ssh instance0`
3. Navigate to stack: `cd /opt/stacks/pvetui_web/pvetui_web`
4. Pull latest: `git pull`
5. Redeploy via Dockge or run `docker-compose up -d --build` in `/opt/stacks/pvetui_web/`

## Important Notes
- The application is a static site - no backend services needed
- All data is client-side only
- The Dockerfile is optimized for ARM64 but works on any architecture
- Do not use Watchtower labels - this project is built locally, not pulled from a registry
